import { Link } from 'react-router-dom';
import type { Location } from '../types/Location';

interface LocationRowProps {
  title: string;
  items: Location[];
}

export default function LocationRow({ title, items }: LocationRowProps) {
  return (
    <section className="ml-5 mb-12">
      <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white">
        {title}
      </h2>

      <div
        className="
        flex
        gap-6
        overflow-x-auto
        overflow-y-visible
        px-2
        py-4
        pr-8
      "
      >
        {items.map((item) => (
          <article
            key={item.id}
            className="
              group
              relative
              w-72
              shrink-0
              overflow-hidden
              rounded-2xl
              bg-white
              p-6
              shadow-lg
              ring-1
              ring-zinc-200
              transition-all
              duration-300
              ease-out

              hover:-translate-y-1
              hover:shadow-2xl
              hover:ring-emerald-500/40

              dark:bg-zinc-900
              dark:ring-zinc-800
              dark:hover:ring-emerald-400/40
            "
          >
            <div
              className="
                mb-5
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-emerald-500
                to-cyan-500
                text-3xl
                transition-all
                duration-300

                group-hover:rotate-12
                group-hover:scale-110
              "
            >
              🌍
            </div>

            <h3 className="line-clamp-2 text-xl font-bold text-zinc-900 dark:text-white">
              {item.name}
            </h3>

            <div className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
              <p>
                <span className="font-semibold">Tipo:</span> {item.type}
              </p>

              <p>
                <span className="font-semibold">Dimensão:</span>{' '}
                {item.dimension}
              </p>

              <p>
                <span className="font-semibold">Criado em:</span>{' '}
                {new Date(item.created).toLocaleDateString('pt-BR')}
              </p>
            </div>

            <Link
              to={`/location/${item.id}`}
              className="
                mt-6
                inline-flex
                w-full
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-r
                from-emerald-500
                to-cyan-500
                py-3
                font-semibold
                text-white
                shadow-md
                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:shadow-xl
                hover:shadow-emerald-500/20

                active:scale-95
              "
            >
              Saiba mais →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
