import { useEffect, useState } from 'react';

import LocationRow from '../../components/LocationRow';
import SearchFilter from '../../components/SearchFilter';

import { getLocations } from '../../services/locationService';

import type { Location } from '../../types/Location';

export default function Locations() {
  const [search, setSearch] = useState('');

  const [locations, setLocations] = useState<Location[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isSearching = search.trim() !== '';

  const filteredLocations = locations.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  function clearFilters() {
    setSearch('');
  }

  useEffect(() => {
    async function loadLocations() {
      try {
        setLoading(true);

        const response = await getLocations(page);

        setLocations(response.results);
        setTotalPages(response.info.pages);
      } catch {
        setError('Erro ao carregar locais.');
      } finally {
        setLoading(false);
      }
    }

    loadLocations();
  }, [page]);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-10">
        <h1 className="text-4xl font-bold dark:text-white">Locations</h1>

        <p className="mt-5 text-zinc-500">Carregando locais...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-10">
        <h1 className="text-4xl font-bold dark:text-white">Locations</h1>

        <p className="mt-5 text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-10">
      <section className="mb-10">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
          Locations
        </h1>

        <p className="mt-2 mb-8 text-zinc-600 dark:text-zinc-400">
          Explore todos os planetas, dimensões e locais do universo Rick and
          Morty.
        </p>
      </section>

      <SearchFilter
        search={search}
        setSearch={setSearch}
        onClear={clearFilters}
      />

      <LocationRow
        title={`Locais - Página ${page}`}
        items={filteredLocations}
        layout="grid"
      />

      {!isSearching && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="
              rounded-xl
              bg-zinc-200
              px-5
              py-3
              font-semibold
              disabled:opacity-50
              dark:bg-zinc-800
              dark:text-white
            "
          >
            ← Anterior
          </button>

          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
            Página {page} de {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="
              rounded-xl
              bg-emerald-500
              px-5
              py-3
              font-semibold
              text-white
              disabled:opacity-50
            "
          >
            Próxima →
          </button>
        </div>
      )}
    </main>
  );
}
