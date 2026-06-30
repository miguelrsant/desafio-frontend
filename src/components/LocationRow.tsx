import { Link } from 'react-router-dom';
import type { Location } from '../types/Location';
import { formatUnknown } from '../utils/formatters';

interface LocationRowProps {
  title: string;
  items: Location[];
  layout?: 'row' | 'grid';
}

export default function LocationRow({
  title,
  items,
  layout = 'row',
}: LocationRowProps) {
  return (
    <section className="mb-12 ml-5">
      <h2
        className="
          mb-6
          text-3xl
          font-bold
          text-zinc-900
          dark:text-white
        "
      >
        {title}
      </h2>

      <div
        className={
          layout === 'grid'
            ? `
              grid
              grid-cols-1
              gap-6
              pr-5
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            `
            : `
              mr-5
              flex
              gap-6
              overflow-x-auto
              overflow-y-visible
              pb-4
              pr-8
            `
        }
      >
        {items.map((item) => (
          <article
            key={item.id}
            className={`
              group
              relative
              overflow-hidden
              rounded-2xl
              bg-white
              p-6
              shadow-lg
              ring-1
              ring-zinc-200
              transition-all
              duration-300

              hover:-translate-y-1
              hover:shadow-2xl
              hover:ring-emerald-500/40

              dark:bg-zinc-900
              dark:ring-zinc-800

              ${layout === 'row' ? 'w-72 shrink-0' : 'w-full'}
            `}
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
                transition

                group-hover:scale-110
              "
            >
              🌍
            </div>

            <h3
              className="
                line-clamp-2
                text-xl
                font-bold
                text-zinc-900
                dark:text-white
              "
            >
              {formatUnknown(item.name)}
            </h3>

            <div
              className="
                mt-4
                space-y-2
                text-sm
                text-zinc-600
                dark:text-zinc-300
              "
            >
              <p>
                <b>Tipo:</b> {formatUnknown(item.type)}
              </p>

              <p>
                <b>Dimensão:</b> {formatUnknown(item.dimension)}
              </p>

              <p>
                <b>Criado:</b>{' '}
                {new Date(formatUnknown(item.created)).toLocaleDateString(
                  'pt-BR'
                )}
              </p>
            </div>

            <Link
              to={`/locations/${item.id}`}
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
                transition

                hover:scale-105

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
