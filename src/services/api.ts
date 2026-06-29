import axios from 'axios';
import type { Character } from '../types/Character';
interface APIResponse {
  results: Character[];
}
const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export async function getCharacters(): Promise<Character[]> {
  const response = await api.get<APIResponse>('/character');
  return response.data.results;
}

export async function getLocation() {
  const response = await api.get<APIResponse>('/location');
  return response.data.results;
}

export async function getEpisode() {
  const response = await api.get<APIResponse>('/episode');
  return response.data.results;
}
