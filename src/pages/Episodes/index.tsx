import { useEffect, useState } from 'react';

import EpisodeRow from '../../components/EpisodeRow';

import { getEpisodes } from '../../services/episodeService';

import type { Episode } from '../../types/Episode';

export default function Episodes() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadEpisodes() {
      try {
        setLoading(true);

        const response = await getEpisodes(page);

        setEpisodes(response.results);
        setTotalPages(response.info.pages);
      } catch {
        setError('Erro ao carregar episódios.');
      } finally {
        setLoading(false);
      }
    }

    loadEpisodes();
  }, [page]);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-10">
        <h1 className="text-4xl font-bold">Episodes</h1>

        <p className="mt-5 text-zinc-500">Carregando episódios...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-10">
        <h1 className="text-4xl font-bold">Episodes</h1>

        <p className="mt-5 text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-10">
      <section className="mb-10">
        <h1
          className="
            text-4xl
            font-bold
            text-zinc-900
            dark:text-white
          "
        >
          Episodes
        </h1>

        <p
          className="
            mt-2
            text-zinc-600
            dark:text-zinc-400
          "
        >
          Explore todos os episódios de Rick and Morty.
        </p>
      </section>

      <EpisodeRow
        title={`Episódios - Página ${page}`}
        items={episodes}
        layout="grid"
      />

      <div
        className="
          mt-10
          flex
          items-center
          justify-center
          gap-4
        "
      >
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="
            rounded-xl
            bg-zinc-200
            px-5
            py-3
            font-semibold
            disabled:opacity-50
            dark:bg-zinc-800
          "
        >
          ← Anterior
        </button>

        <span className="font-semibold">
          {page} / {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
          className="
            rounded-xl
            bg-cyan-500
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
    </main>
  );
}
