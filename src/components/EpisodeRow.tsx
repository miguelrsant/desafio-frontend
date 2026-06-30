import type { Episode } from '../types/Episode';

interface EpisodeRowProps {
  title: string;
  items: Episode[];
}

export default function EpisodeRow({ title, items }: EpisodeRowProps) {
  return (
    <>
      <h1>{title}</h1>
      {items.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
        </div>
      ))}
    </>
  );
}
