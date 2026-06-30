import { Link } from 'react-router-dom';
import type { Character } from '../types/Character';

interface CharacterRowProps {
  title: string;
  items: Character[];
}

export default function CharacterRow({ title, items }: CharacterRowProps) {
  return (
    <section className="mb-12 ml-5">
      <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white">
        {title}
      </h2>

      <div className="mr-5 flex gap-6 overflow-x-auto pb-4">
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
              px-2
              py-4
              pb-6
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
                  absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold text-white
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
              <h3 className="truncate text-2xl font-bold text-zinc-900 dark:text-white">
                {item.name}
              </h3>

              <div className="space-y-1 text-sm text-zinc-600 dark:text-zinc-300">
                <p>
                  <span className="font-semibold">Species:</span> {item.species}
                </p>

                <p>
                  <span className="font-semibold">Gender:</span> {item.gender}
                </p>

                <p>
                  <span className="font-semibold">Status:</span> {item.status}
                </p>
              </div>

              <Link
                to={`/character/${item.id}`}
                className="
                  mt-5
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-emerald-500
                  px-4
                  py-3
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:from-cyan-400
                  hover:to-emerald-400
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
