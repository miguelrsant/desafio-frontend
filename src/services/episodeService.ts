import { api } from './api';

import type { ApiResponse } from '../types/ApiResponse';
import type { Episode } from '../types/Episode';

interface EpisodeFilters {
  page?: number;
  name?: string;
  episode?: string;
}

export async function getEpisodes(page = 1) {
  const response = await api.get<ApiResponse<Episode>>('/episode', {
    params: {
      page,
    },
  });

  return response.data;
}

export async function getEpisodeById(id: number | string) {
  const response = await api.get<Episode>(`/episode/${id}`);

  return response.data;
}

export async function getEpisodesByIds(ids: Array<number | string>) {
  const response = await api.get<Episode[]>(`/episode/${ids.join(',')}`);

  return response.data;
}

export async function searchEpisodes(filters: EpisodeFilters) {
  const response = await api.get<ApiResponse<Episode>>('/episode', {
    params: filters,
  });

  return response.data;
}
