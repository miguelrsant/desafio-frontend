import { useEffect, useState } from 'react';
import { getCharacters, getEpisode, getLocation } from './services/api';
import type { Character } from './types/Character';
import type { Location } from './types/Location';
import type { Episode } from './types/Episode';
import CharacterRow from './components/CharacterRow';
import LocationRow from './components/LocationRow';
import EpisodeRow from './components/EpisodeRow';

function App() {
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const [locationList, setLocationList] = useState<Location[]>([]);
  const [episodeList, setEpisodeList] = useState<Episode[]>([]);

  useEffect(() => {
    const loadAll = async () => {
      const listCharacter = await getCharacters();
      const listLocation = await getLocation();
      const listEpisode = await getEpisode();

      setCharacterList(listCharacter);
      setLocationList(listLocation);
      setEpisodeList(listEpisode);
    };

    loadAll();
  }, []);

  return (
    <>
      <section className="lists">
        <CharacterRow title="Personagens" items={characterList} />
        <LocationRow title="Localizações" items={locationList} />
        <EpisodeRow title="Episódios" items={episodeList} />
      </section>
    </>
  );
}

export default App;
