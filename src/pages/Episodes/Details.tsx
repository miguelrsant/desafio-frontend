import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CharacterRow from '../../components/CharacterRow';
import EpisodeRow from '../../components/EpisodeRow';
import { getEpisodeById, getEpisodes } from '../../services/episodeService';
import { getCharactersByIds } from '../../services/characterService';

import type { Episode } from '../../types/Episode';
import type { Character } from '../../types/Character';

export default function EpisodeDetails() {
  const { id } = useParams();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [otherCharacters, setOtherCharacters] = useState<Character[]>([]);
  const [episode, setEpisode] = useState<Episode | null>(null);

  const [characters, setCharacters] = useState<Character[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEpisode() {
      try {
        if (!id) return;

        const data = await getEpisodeById(id);

        const dataEpisodes = await getEpisodes();

        const dataCharacters = await getCharactersByIds(
          data.characters
            .map((url) => url.split('/').pop())
            .filter(Boolean) as string[]
        );

        setEpisodes(
          dataEpisodes.results
            .filter((item: Episode) => item.id !== data.id)
            .slice(0, 8)
        );

        setOtherCharacters(
          Array.isArray(dataCharacters)
            ? dataCharacters.slice(0, 8)
            : [dataCharacters]
        );

        setEpisode(data);

        const characterIds = data.characters
          .map((url) => url.split('/').pop())
          .filter(Boolean) as string[];

        const characterData = await getCharactersByIds(characterIds);

        setCharacters(
          Array.isArray(characterData) ? characterData : [characterData]
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadEpisode();
  }, [id]);

  if (loading) {
    return <main className="p-10">Carregando episódio...</main>;
  }

  if (!episode) {
    return <main className="p-10">Episódio não encontrado.</main>;
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-10">
      <section
        className="
          rounded-3xl
          bg-white
          p-8
          shadow-xl
          dark:bg-zinc-900
        "
      >
        <span
          className="
            rounded-full
            bg-cyan-500
            px-4
            py-2
            font-bold
            text-white
          "
        >
          {episode.episode}
        </span>

        <h1
          className="
            mt-6
            text-5xl
            font-bold
            dark:text-white
          "
        >
          {episode.name}
        </h1>

        <div
          className="
            mt-8
            space-y-3
            text-zinc-600
            dark:text-zinc-300
          "
        >
          <p>
            <b>Data:</b> {episode.air_date}
          </p>

          <p>
            <b>Criado:</b>{' '}
            {new Date(episode.created).toLocaleDateString('pt-BR')}
          </p>
        </div>
      </section>

      <section className="mt-14">
        <CharacterRow
          title="Personagens do episódio"
          items={characters}
          layout="grid"
        />
      </section>
      <section className="mt-14">
        <EpisodeRow title="Outros episódios" items={episodes} />
      </section>

      <section className="mt-14">
        <CharacterRow title="Outros personagens" items={otherCharacters} />
      </section>
    </main>
  );
}
