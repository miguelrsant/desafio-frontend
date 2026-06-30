import type { Location } from '../types/Location';

interface LocationRowProps {
  title: string;
  items: Location[];
}

export default function LocationRow({ title, items }: LocationRowProps) {
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
