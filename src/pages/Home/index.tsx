import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CharacterRow from '../../components/CharacterRow';
import EpisodeRow from '../../components/EpisodeRow';
import LocationRow from '../../components/LocationRow';

import { getCharacters } from '../../services/characterService';
import { getEpisodes } from '../../services/episodeService';
import { getLocations } from '../../services/locationService';

import type { Character } from '../../types/Character';
import type { Episode } from '../../types/Episode';
import type { Location } from '../../types/Location';

export default function Home() {
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const [episodeList, setEpisodeList] = useState<Episode[]>([]);
  const [locationList, setLocationList] = useState<Location[]>([]);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [characters, episodes, locations] = await Promise.all([
          getCharacters(),
          getEpisodes(),
          getLocations(),
        ]);

        setCharacterList(characters.results.slice(0, 8));
        setEpisodeList(episodes.results.slice(0, 6));
        setLocationList(locations.results.slice(0, 6));
      } catch (error) {
        console.error('Erro ao carregar dados da API:', error);
      }
    };

    loadAll();
  }, []);

  return (
    <main
      className="
        mx-auto
        min-h-screen
        max-w-7xl
        px-5
        py-8
      "
    >
      <section className="mb-16 text-center">
        <h1
          className="
            mb-4
            text-4xl
            font-bold
            md:text-6xl
          "
        >
          Rick & Morty Explorer
        </h1>

        <p
          className="
            mx-auto
            mb-8
            max-w-2xl
            text-lg
            text-zinc-600
            dark:text-zinc-400
          "
        >
          Explore personagens, episódios e localizações do universo Rick and
          Morty através da API oficial.
        </p>

        <div
          className="
            flex
            flex-wrap
            justify-center
            gap-4
          "
        >
          <Link
            to="/characters"
            className="
              rounded-xl
              bg-cyan-500
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-cyan-600
            "
          >
            Personagens
          </Link>

          <Link
            to="/episodes"
            className="
              rounded-xl
              bg-zinc-200
              px-6
              py-3
              font-semibold
              transition
              hover:bg-zinc-300
              dark:bg-zinc-800
              dark:hover:bg-zinc-700
            "
          >
            Episódios
          </Link>

          <Link
            to="/locations"
            className="
              rounded-xl
              bg-zinc-200
              px-6
              py-3
              font-semibold
              transition
              hover:bg-zinc-300
              dark:bg-zinc-800
              dark:hover:bg-zinc-700
            "
          >
            Localizações
          </Link>
        </div>
      </section>

      <CharacterRow title="Personagens em destaque" items={characterList} />

      <div className="mb-12 flex justify-end">
        <Link
          to="/characters"
          className="
            font-medium
            text-cyan-500
            transition
            hover:text-cyan-600
          "
        >
          Ver todos →
        </Link>
      </div>

      <EpisodeRow title="Episódios" items={episodeList} />

      <div className="mb-12 flex justify-end">
        <Link
          to="/episodes"
          className="
            font-medium
            text-cyan-500
            transition
            hover:text-cyan-600
          "
        >
          Ver todos →
        </Link>
      </div>

      <LocationRow title="Localizações" items={locationList} />

      <div className="flex justify-end">
        <Link
          to="/locations"
          className="
            font-medium
            text-cyan-500
            transition
            hover:text-cyan-600
          "
        >
          Ver todas →
        </Link>
      </div>
    </main>
  );
}
