import type { Character } from '../types/Character';

interface MovieRowProps {
  title: string;
  items: Character[];
}

export default function MovieRow({ title, items }: MovieRowProps) {
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
