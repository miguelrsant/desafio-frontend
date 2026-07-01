import { Link } from 'react-router-dom';
import type { Episode } from '../types/Episode';
import { formatUnknown } from '../utils/formatters';

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
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
        {title}
      </h2>

      <div
        className={
          layout === 'grid'
            ? `
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            `
            : `
              flex
              gap-5
              overflow-x-auto
              overflow-y-visible
              pb-8
              snap-x
              snap-mandatory
              scroll-smooth

              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden

              lg:gap-8
            `
        }
      >
        {items.map((item) => (
          <article
            key={item.id}
            className={`
              group
              w-[72vw]
              max-w-[260px]
              shrink-0
              snap-center

              rounded-2xl
              border
              border-zinc-200
              bg-white
              shadow-lg

              transition-shadow
              duration-300

              md:w-72
              md:hover:shadow-2xl

              dark:border-zinc-800
              dark:bg-zinc-900

              ${layout === 'grid' ? 'w-full max-w-full' : ''}
            `}
          >
            <div className="overflow-hidden rounded-t-2xl">
              <div className="relative">
                <div
                  className="
                    flex
                    h-40
                    items-center
                    justify-center
                    bg-gradient-to-br
                    from-violet-500
                    to-cyan-500

                    transition-transform
                    duration-500

                    group-hover:scale-120
                  "
                >
                  <span className="text-4xl">📺</span>
                </div>
              </div>
            </div>

            <div className="p-5">
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
                {formatUnknown(item.episode)}
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
                  <span className="font-semibold">Exibição:</span>{' '}
                  {formatUnknown(item.air_date)}
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
                  flex
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
                  transition
              
                  md:hover:shadow-xl
                  md:hover:scale-[1.02]
                  active:scale-95
                "
              >
                Saiba mais →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
