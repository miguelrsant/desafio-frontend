import type { Character } from '../types/Character';

interface CharacterRowProps {
  title: string;
  items: Character[];
}

export default function CharacterRow({ title, items }: CharacterRowProps) {
  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <div className="flex flex gap-6 overflow-x-auto pb-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="
              w-60
              shrink-0
              overflow-hidden
              rounded-xl
              bg-zinc-900
              transition
              duration-300
              hover:scale-105
              hover:cursor-pointer
          "
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-64 w-full object-cover"
            />

            <div className="p-4">
              <p className="font-semibold">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
