import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CharacterRow from '../../components/CharacterRow';
import LocationRow from '../../components/LocationRow';
import { getLocationById, getLocations } from '../../services/locationService';
import {
  getCharactersByIds,
  getCharacters,
} from '../../services/characterService';

import type { Location } from '../../types/Location';
import type { Character } from '../../types/Character';

export default function LocationDetails() {
  const { id } = useParams();

  const [location, setLocation] = useState<Location | null>(null);
  const [dataLocations, setDataLocations] = useState<Location[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [otherCharacters, setOtherCharacters] = useState<Character[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLocation() {
      if (!id) return;

      try {
        setLoading(true);

        let locationData: Location | null = null;

        try {
          locationData = await getLocationById(id);

          setLocation(locationData);

          const residentIds = locationData.residents
            .map((url) => url.split('/').pop())
            .filter(Boolean) as string[];

          if (residentIds.length) {
            const residentData = await getCharactersByIds(residentIds);

            setCharacters(
              Array.isArray(residentData) ? residentData : [residentData]
            );
          }
        } catch (error) {
          console.error('Local não encontrado', error);

          setLocation(null);
          setCharacters([]);
        }

        const locations = await getLocations();

        setDataLocations(
          locations.results
            .filter((item: Location) => item.id !== locationData?.id)
            .slice(0, 8)
        );

        const charactersData = await getCharacters();

        setOtherCharacters(charactersData.results.slice(0, 8));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadLocation();
  }, [id]);

  if (loading) {
    return <main className="p-10">Carregando localização...</main>;
  }

  if (!location) {
    return (
      <main className="p-10">
        <p className="ml-5">Local não encontrado.</p>
        <section className="mt-14">
          <LocationRow title="Outros locais" items={dataLocations} />
        </section>
        <section className="mt-14">
          <CharacterRow title="Outros personagens" items={otherCharacters} />
        </section>
      </main>
    );
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
        <div
          className="
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-3xl
            bg-gradient-to-br
            from-emerald-500
            to-cyan-500
            text-5xl
          "
        >
          🌍
        </div>

        <h1
          className="
            mt-8
            text-5xl
            font-bold
            text-zinc-900
            dark:text-white
          "
        >
          {location.name}
        </h1>

        <div
          className="
            mt-8
            grid
            gap-5
            text-zinc-700
            dark:text-zinc-300

            sm:grid-cols-2
          "
        >
          <p>
            <b>Tipo:</b> {location.type}
          </p>

          <p>
            <b>Dimensão:</b> {location.dimension}
          </p>

          <p>
            <b>Criado:</b>{' '}
            {new Date(location.created).toLocaleDateString('pt-BR')}
          </p>

          <p>
            <b>Moradores:</b> {location.residents.length}
          </p>
        </div>
      </section>

      <section className="mt-14">
        <CharacterRow
          title="Personagens deste local"
          items={characters}
          layout="grid"
        />
      </section>
      <section className="mt-14">
        <LocationRow title="Outros locais" items={dataLocations} />
      </section>

      <section className="mt-14">
        <CharacterRow title="Outros personagens" items={otherCharacters} />
      </section>
    </main>
  );
}
