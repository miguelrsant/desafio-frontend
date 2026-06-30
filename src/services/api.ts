import axios from 'axios';
import type { Character } from '../types/Character';
import type { Location } from '../types/Location';
import type { Episode } from '../types/Episode';

interface APIResponseCharacter {
  results: Character[];
}

interface APIResponseLocation {
  results: Location[];
}

interface APIResponseEpisode {
  results: Episode[];
}

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export async function getCharacters(): Promise<Character[]> {
  const response = await api.get<APIResponseCharacter>('/character');
  return response.data.results;
}

export async function getLocation(): Promise<Location[]> {
  const response = await api.get<APIResponseLocation>('/location');
  return response.data.results;
}

export async function getEpisode(): Promise<Episode[]> {
  const response = await api.get<APIResponseEpisode>('/episode');
  return response.data.results;
}
