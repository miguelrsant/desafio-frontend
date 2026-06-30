import { Link } from 'react-router-dom';
import type { Character } from '../types/Character';

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
            pb-4
            scrollbar-thin
          `
        }
      >
        {items.map((item) => (
          <article
            key={item.id}
            className="
              group
              w-72
              shrink-0
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-2xl
              dark:bg-zinc-900

              ${
                layout === 'grid'
                  ? 'w-full'
                  : ''
              }
            "
          >
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="
                  h-72
                  w-full
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-110
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
                {item.status}
              </span>
            </div>

            <div className="space-y-2 p-5">
              <h3
                className="
                truncate
                text-2xl
                font-bold
                text-zinc-900
                dark:text-white
              "
              >
                {item.name}
              </h3>

              <div
                className="
                space-y-1
                text-sm
                text-zinc-600
                dark:text-zinc-300
              "
              >
                <p>
                  <b>Species:</b> {item.species}
                </p>

                <p>
                  <b>Gender:</b> {item.gender}
                </p>

                <p>
                  <b>Status:</b> {item.status}
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
                  hover:scale-105
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
