import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CharacterRow from '../../components/CharacterRow';
import EpisodeRow from '../../components/EpisodeRow';

import { getCharacterById } from '../../services/characterService';
import { getEpisodesByIds } from '../../services/episodeService';
import { getCharacters } from '../../services/characterService';

import type { Character } from '../../types/Character';
import type { Episode } from '../../types/Episode';

export default function CharacterDetails() {
  const { id } = useParams();

  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!id) return;

      try {
        setLoading(true);

        let characterData: Character | null = null;

        try {
          characterData = await getCharacterById(id);

          setCharacter(characterData);

          const episodeIds = characterData.episode
            .map((url: string) => url.split('/').pop())
            .filter(Boolean) as string[];

          const episodeData = await getEpisodesByIds(episodeIds);

          setEpisodes(Array.isArray(episodeData) ? episodeData : [episodeData]);
        } catch (error) {
          console.error('Personagem não encontrado', error);
          setCharacter(null);
          setEpisodes([]);
        }

        const recommended = await getCharacters();

        setCharacters(
          recommended.results
            .filter((item) => item.id !== characterData?.id)
            .slice(0, 8)
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-10">
        <p>Carregando personagem...</p>
      </main>
    );
  }

  if (!character) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-10">
        <p className="ml-5">Personagem não encontrado.</p>

        <section className="mt-14">
          <CharacterRow title="Outros personagens" items={characters} />
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-10">
      <section
        className="
          grid
          gap-8
          rounded-3xl
          bg-white
          p-6
          shadow-xl
          dark:bg-zinc-900
          lg:grid-cols-[350px_1fr]
        "
      >
        <img
          src={character.image}
          alt={character.name}
          className="
            w-full
            rounded-3xl
          "
        />

        <div className="flex flex-col justify-center">
          <h1
            className="
              text-5xl
              font-bold
              text-zinc-900
              dark:text-white
            "
          >
            {character.name}
          </h1>

          <span
            className={`
              mt-4
              w-fit
              rounded-full
              px-4
              py-2
              text-sm
              font-bold
              text-white

              ${
                character.status === 'Alive'
                  ? 'bg-green-500'
                  : character.status === 'Dead'
                    ? 'bg-red-500'
                    : 'bg-zinc-500'
              }
            `}
          >
            {character.status}
          </span>

          <div
            className="
              mt-8
              grid
              gap-4
              text-zinc-700
              dark:text-zinc-300
              sm:grid-cols-2
            "
          >
            <p>
              <b>Espécie:</b> {character.species}
            </p>

            <p>
              <b>Gênero:</b> {character.gender}
            </p>

            <p>
              <b>Origem:</b> {character.origin.name}
            </p>

            <p>
              <b>Localização:</b> {character.location.name}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <EpisodeRow title="Episódios" items={episodes} />
      </section>

      <section className="mt-14">
        <CharacterRow title="Outros personagens" items={characters} />
      </section>
    </main>
  );
}
