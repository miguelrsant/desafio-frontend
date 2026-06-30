interface SearchFilterProps {
  search: string;
  setSearch: (value: string) => void;

  status?: string;
  setStatus?: (value: string) => void;

  species?: string;
  setSpecies?: (value: string) => void;

  speciesOptions?: readonly string[];

  onSearch?: () => void;
  onClear?: () => void;
}

export default function SearchFilter({
  search,
  setSearch,
  status,
  setStatus,
  species,
  setSpecies,
  speciesOptions = [],
  onSearch,
  onClear,
}: SearchFilterProps) {
  return (
    <section className="mb-10 rounded-3xl bg-white p-6 shadow-lg dark:bg-zinc-900">
      <div className="grid gap-5 lg:grid-cols-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar..."
          className="
            rounded-xl
            border
            border-zinc-200
            bg-transparent
            px-4
            py-3
            outline-none
            dark:border-zinc-700
            dark:text-white
          "
        />

        {setStatus && (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
              rounded-xl
              border
              border-zinc-200
              bg-white
              px-4
              py-3
              dark:border-zinc-700
              dark:bg-zinc-800
              dark:text-white
            "
          >
            <option value="">Todos os status</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        )}

        {setSpecies && (
          <select
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="
              rounded-xl
              border
              border-zinc-200
              bg-white
              px-4
              py-3
              dark:border-zinc-700
              dark:bg-zinc-800
              dark:text-white
            "
          >
            <option value="">Todas as espécies</option>

            {speciesOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        )}

        {onSearch && (
          <button
            onClick={onSearch}
            className="
      flex
      items-center
      justify-center
      gap-2
      rounded-xl
      bg-cyan-500
      px-5
      py-3
      font-semibold
      text-white
      transition
      hover:bg-cyan-600
    "
          >
            Buscar
          </button>
        )}

        {onClear && (
          <button
            onClick={onClear}
            className="
              rounded-xl
              bg-red-500
              px-5
              py-3
              font-semibold
              text-white
              transition
              hover:bg-red-600
            "
          >
            Limpar
          </button>
        )}
      </div>
    </section>
  );
}
