import { Link } from 'react-router-dom';
import type { Episode } from '../types/Episode';

interface EpisodeRowProps {
  title: string;
  items: Episode[];
  layout?: 'row' | 'grid';
}

export default function EpisodeRow({
  title,
  items,
  layout = 'row',
}: EpisodeRowProps) {
  return (
    <section className="mb-12 ml-5">
      <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white">
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
              ease-out

              hover:-translate-y-1
              hover:shadow-2xl
              hover:ring-cyan-500/40

              dark:bg-zinc-900
              dark:ring-zinc-800
              dark:hover:ring-cyan-400/50

              ${layout === 'row' ? 'w-72 shrink-0' : 'w-full'}
            `}
          >
            <span
              className="
                inline-flex
                rounded-full
                bg-cyan-100
                px-3
                py-1
                text-sm
                font-semibold
                text-cyan-700

                dark:bg-cyan-900/40
                dark:text-cyan-300
              "
            >
              {item.episode}
            </span>

            <h3
              className="
                mt-4
                line-clamp-2
                text-xl
                font-bold
                text-zinc-900
                dark:text-white
              "
            >
              {item.name}
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
                <span className="font-semibold">Exibição:</span> {item.air_date}
              </p>

              <p>
                <span className="font-semibold">Criado em:</span>{' '}
                {new Date(item.created).toLocaleDateString('pt-BR')}
              </p>
            </div>

            <Link
              to={`/episodes/${item.id}`}
              className="
                mt-6
                inline-flex
                w-full
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-r
                from-violet-500
                to-cyan-500
                py-3
                font-semibold
                text-white
                shadow-md
                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:shadow-xl

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
