import { useEffect, useState } from 'react';

import EpisodeRow from '../../components/EpisodeRow';
import SearchFilter from '../../components/SearchFilter';

import { getEpisodes } from '../../services/episodeService';

import type { Episode } from '../../types/Episode';

export default function Episodes() {
  const [search, setSearch] = useState('');
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    name: '',
  });

  function handleSearch() {
    setPage(1);
    setFilters({
      name: search.trim(),
    });
  }

  function clearFilters() {
    setSearch('');
    setPage(1);
    setFilters({
      name: '',
    });
  }

  useEffect(() => {
    async function loadEpisodes() {
      try {
        setLoading(true);
        setError('');

        const response = await getEpisodes({
          page,
          name: filters.name,
        });

        setEpisodes(response.results);
        setTotalPages(response.info.pages);
      } catch {
        setEpisodes([]);
        setError('Erro ao carregar episódios.');
      } finally {
        setLoading(false);
      }
    }

    loadEpisodes();
  }, [page, filters]);

  return (
    <main className="mx-auto max-w-7xl px-5 py-10">
      <section className="mb-10">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
          Episodes
        </h1>

        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Explore todos os episódios de Rick and Morty.
        </p>
      </section>

      <SearchFilter
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
        onClear={clearFilters}
      />

      {loading ? (
        <p className="mt-6 text-zinc-500 dark:text-zinc-400 text-center">
          Carregando episódios...
        </p>
      ) : error ? (
        <p className="mt-6 text-red-500 font-medium text-center">{error}</p>
      ) : (
        <>
          <EpisodeRow
            title={`Episódios - Página ${page}`}
            items={episodes}
            layout="grid"
          />

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page === 1}
                className="
                  rounded-xl bg-zinc-200 px-5 py-3 font-semibold transition
                  disabled:cursor-not-allowed disabled:opacity-50
                  dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700
                "
              >
                ← Anterior
              </button>

              <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                Página {page} de {totalPages}
              </span>

              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page === totalPages}
                className="
                  rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white transition
                  disabled:cursor-not-allowed disabled:opacity-50 hover:bg-cyan-600
                "
              >
                Próxima →
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
