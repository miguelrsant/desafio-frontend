import MovieRow from './components/MovieRow';
import { useEffect, useState } from 'react';
import { getCharacters } from './services/api';
import type { Character } from './types/Character';

function App() {
  const [movieList, setMovieList] = useState<Character[]>([]);

  useEffect(() => {
    const loadAll = async () => {
      const list = await getCharacters();

      setMovieList(list);
    };

    loadAll();
  }, []);

  return (
    <>
      <section className="lists">
        <MovieRow title="Olá" items={movieList} />
      </section>
    </>
  );
}

export default App;
