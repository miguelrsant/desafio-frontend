import type { Location } from '../types/Location';

interface LocationRowProps {
  title: string;
  items: Location[];
}

export default function LocationRow({ title, items }: LocationRowProps) {
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
