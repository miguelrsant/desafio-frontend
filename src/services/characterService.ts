import { api } from './api';

import type { ApiResponse } from '../types/ApiResponse';
import type { Character } from '../types/Character';

interface CharacterFilters {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
}

export async function getCharacters(filters: CharacterFilters = {}) {
  const response = await api.get<ApiResponse<Character>>('/character', {
    params: filters,
  });

  return response.data;
}

export async function getCharacterById(id: number | string) {
  const response = await api.get<Character>(`/character/${id}`);

  return response.data;
}

export async function getCharactersByIds(ids: Array<number | string>) {
  const response = await api.get<Character[]>(`/character/${ids.join(',')}`);

  return response.data;
}

export async function getAllSpecies() {
  const firstPage = await getCharacters({ page: 1 });

  const requests = [];

  for (let page = 2; page <= firstPage.info.pages; page++) {
    requests.push(getCharacters({ page }));
  }

  const responses = await Promise.all(requests);

  const allCharacters = [
    ...firstPage.results,
    ...responses.flatMap((item) => item.results),
  ];

  return [...new Set(allCharacters.map((item) => item.species))].sort();
}
