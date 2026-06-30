import type { Episode } from '../types/Episode';

interface EpisodeRowProps {
  title: string;
  items: Episode[];
}

export default function EpisodeRow({ title, items }: EpisodeRowProps) {
  return (
    <>
      <div className="">
        <h2 className="mb-4 text-2xl font-bold">{title}</h2>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {items.map((item) => (
            <div key={item.id} className="w-48 shrink-0">
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
