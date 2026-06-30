import { api } from './api';

import type { ApiResponse } from '../types/ApiResponse';
import type { Character } from '../types/Character';

interface CharacterFilters {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
}

export async function getCharacters(page = 1) {
  const response = await api.get<ApiResponse<Character>>('/character', {
    params: {
      page,
    },
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

export async function searchCharacters(filters: CharacterFilters) {
  const response = await api.get<ApiResponse<Character>>('/character', {
    params: filters,
  });

  return response.data;
}
