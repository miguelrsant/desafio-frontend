import { Link } from 'react-router-dom';
import type { Character } from '../types/Character';
import { formatUnknown } from '../utils/formatters';

interface CharacterRowProps {
  title: string;
  items: Character[];
  layout?: 'row' | 'grid';
}

export default function CharacterRow({
  title,
  items,
  layout = 'row',
}: CharacterRowProps) {
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
            border border-zinc-200
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
                <img
                  src={item.image}
                  alt={item.name}
                  className="
                  h-72
                  w-full
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-120
                "
                />

                <span
                  className={`
                  absolute
                  top-4
                  right-4
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-white

                  ${
                    item.status === 'Alive'
                      ? 'bg-green-500'
                      : item.status === 'Dead'
                        ? 'bg-red-500'
                        : 'bg-gray-500'
                  }
                `}
                >
                  {formatUnknown(item.status)}
                </span>
              </div>
            </div>

            <div className="space-y-2 p-5">
              <h3 className="truncate text-2xl font-bold text-zinc-900 dark:text-white">
                {formatUnknown(item.name)}
              </h3>

              <div className="space-y-1 text-sm text-zinc-600 dark:text-zinc-300">
                <p>
                  <b>Species:</b> {formatUnknown(item.species)}
                </p>

                <p>
                  <b>Gender:</b> {formatUnknown(item.gender)}
                </p>

                <p>
                  <b>Status:</b> {formatUnknown(item.status)}
                </p>
              </div>

              <Link
                to={`/characters/${item.id}`}
                className="
                  mt-5
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-emerald-500
                  py-3
                  font-semibold
                  text-white
                  transition
                  

                  md:hover:scale-[1.02]
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
