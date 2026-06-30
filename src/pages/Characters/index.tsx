import { useEffect, useState } from 'react';

import CharacterRow from '../../components/CharacterRow';
import SearchFilter from '../../components/SearchFilter';

import { getCharacters } from '../../services/characterService';
import { SPECIES_OPTIONS } from '../../constants/species';

import type { Character } from '../../types/Character';

export default function Characters() {
  const [characters, setCharacters] = useState<Character[]>([]);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');

  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isSearching =
    filters.name !== '' || filters.status !== '' || filters.species !== '';

  function clearFilters() {
    setSearch('');
    setStatus('');
    setSpecies('');
    setPage(1);
    setFilters({
      name: '',
      status: '',
      species: '',
    });
  }

  function handleSearch() {
    setPage(1);
    setFilters({
      name: search,
      status,
      species,
    });
  }

  useEffect(() => {
    async function loadCharacters() {
      try {
        setLoading(true);
        setError('');

        const response = await getCharacters({
          page,
          name: filters.name,
          status: filters.status,
          species: filters.species,
        });

        setCharacters(response.results);
        setTotalPages(response.info.pages);
      } catch {
        setCharacters([]);
        setError('Nenhum personagem encontrado.');
      } finally {
        setLoading(false);
      }
    }

    loadCharacters();
  }, [page, filters]);

  return (
    <main className="mx-auto max-w-7xl px-5 py-10">
      <section className="mb-10">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
          Characters
        </h1>

        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Explore todos os personagens do universo Rick and Morty.
        </p>
      </section>

      <SearchFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        species={species}
        setSpecies={setSpecies}
        speciesOptions={SPECIES_OPTIONS}
        onSearch={handleSearch}
        onClear={clearFilters}
      />

      {loading ? (
        <p className="mt-6 text-zinc-500 dark:text-zinc-400 text-center">
          Carregando personagens...
        </p>
      ) : error ? (
        <p className="mt-6 text-red-500 font-medium text-center">{error}</p>
      ) : (
        <>
          <CharacterRow
            title={`Personagens - Página ${page}`}
            items={characters}
            layout="grid"
          />

          {!isSearching && totalPages > 1 && (
            <section className="mt-10 flex items-center justify-center gap-4">
              <button
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page === 1}
                className="
                  rounded-xl bg-zinc-200 px-5 py-3 font-semibold transition
                  hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-50
                  dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100
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
                  hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50
                "
              >
                Próxima →
              </button>
            </section>
          )}
        </>
      )}
    </main>
  );
}
