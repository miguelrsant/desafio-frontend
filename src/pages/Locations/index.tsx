import { useEffect, useState } from 'react';

import LocationRow from '../../components/LocationRow';

import { getLocations } from '../../services/locationService';

import type { Location } from '../../types/Location';

export default function Locations() {
  const [locations, setLocations] = useState<Location[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLocations() {
      setLoading(true);

      const response = await getLocations(page);

      setLocations(response.results);
      setTotalPages(response.info.pages);

      setLoading(false);
    }

    loadLocations();
  }, [page]);

  if (loading) {
    return <main className="p-10">Carregando locais...</main>;
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-10">
      <h1
        className="
      text-4xl
      font-bold
      text-zinc-900
      dark:text-white
    "
      >
        Locations
      </h1>

      <p
        className="
      mt-2
      text-zinc-600
      dark:text-zinc-400
      mb-8
    "
      >
        Explore todos os planetas, dimensões e locais do universo Rick and
        Morty.
      </p>

      <LocationRow
        title={`Locais página ${page}`}
        items={locations}
        layout="grid"
      />

      <div
        className="
          flex
          justify-center
          gap-5
        "
      >
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="
            rounded-xl
            bg-zinc-800
            px-5
            py-3
            text-white
            disabled:opacity-50
          "
        >
          ← Voltar
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="
            rounded-xl
            bg-emerald-500
            px-5
            py-3
            text-white
            disabled:opacity-50
          "
        >
          Próxima →
        </button>
      </div>
    </main>
  );
}
