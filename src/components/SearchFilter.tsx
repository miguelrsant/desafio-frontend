interface SearchFilterProps {
  search: string;
  setSearch: (value: string) => void;

  status?: string;
  setStatus?: (value: string) => void;

  species?: string;
  setSpecies?: (value: string) => void;

  speciesOptions?: string[];

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
  onClear,
}: SearchFilterProps) {
  return (
    <section
      className="
        mb-10
        rounded-3xl
        bg-white
        p-6
        shadow-lg

        dark:bg-zinc-900
      "
    >
      <div className="grid gap-5 md:grid-cols-3">
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
      text-zinc-900
      shadow-sm
      outline-none
      transition
      focus:border-cyan-500

      dark:border-zinc-700
      dark:bg-zinc-800
      dark:text-white
    "
          >
            <option
              className="bg-white text-zinc-900 dark:bg-zinc-800 dark:text-white"
              value=""
            >
              Todos os status
            </option>

            <option
              className="bg-white text-zinc-900 dark:bg-zinc-800 dark:text-white"
              value="Alive"
            >
              Alive
            </option>

            <option
              className="bg-white text-zinc-900 dark:bg-zinc-800 dark:text-white"
              value="Dead"
            >
              Dead
            </option>

            <option
              className="bg-white text-zinc-900 dark:bg-zinc-800 dark:text-white"
              value="unknown"
            >
              Unknown
            </option>
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
      text-zinc-900
      shadow-sm
      outline-none
      transition
      focus:border-cyan-500

      dark:border-zinc-700
      dark:bg-zinc-800
      dark:text-white
    "
          >
            <option
              className="bg-white text-zinc-900 dark:bg-zinc-800 dark:text-white"
              value=""
            >
              Todas as espécies
            </option>

            {speciesOptions.map((item) => (
              <option
                key={item}
                value={item}
                className="bg-white text-zinc-900 dark:bg-zinc-800 dark:text-white"
              >
                {item}
              </option>
            ))}
          </select>
        )}

        {onClear && (
          <button
            onClick={onClear}
            className="
                rounded-xl
                bg-red-500
                px-4
                py-3
                font-semibold
                text-white
                transition
                hover:bg-red-600
                cursor-pointer
                "
          >
            Limpar filtros
          </button>
        )}
      </div>
    </section>
  );
}
