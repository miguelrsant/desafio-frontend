import { Link } from 'react-router-dom';
import type { Episode } from '../types/Episode';

interface EpisodeRowProps {
  title: string;
  items: Episode[];
}

export default function EpisodeRow({ title, items }: EpisodeRowProps) {
  return (
    <section className="mb-12 ml-5">
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
        pr-8"
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
              hover:ring-cyan-500/40

              dark:bg-zinc-900
              dark:ring-zinc-800
              dark:hover:ring-cyan-400/50
            "
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
                transition-all
                duration-300
                group-hover:bg-cyan-500
                group-hover:text-white

                dark:bg-cyan-900/40
                dark:text-cyan-300
                dark:group-hover:bg-cyan-500
                dark:group-hover:text-white
              "
            >
              {item.episode}
            </span>

            <h3 className="mt-4 line-clamp-2 text-xl font-bold text-zinc-900 dark:text-white">
              {item.name}
            </h3>

            <div className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
              <p>
                <span className="font-semibold">Exibição:</span> {item.air_date}
              </p>

              <p>
                <span className="font-semibold">Criado em:</span>{' '}
                {new Date(item.created).toLocaleDateString('pt-BR')}
              </p>
            </div>

            <Link
              to={`/episode/${item.id}`}
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
                hover:shadow-cyan-500/20

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
