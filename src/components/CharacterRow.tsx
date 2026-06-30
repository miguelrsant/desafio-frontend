import type { Character } from '../types/Character';

interface CharacterRowProps {
  title: string;
  items: Character[];
}

export default function CharacterRow({ title, items }: CharacterRowProps) {
  return (
    <>
      <h1>{title}</h1>

      {items.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt={item.name} />
          <p>{item.name}</p>
        </div>
      ))}
    </>
  );
}
