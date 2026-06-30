import { api } from './api';

import type { ApiResponse } from '../types/ApiResponse';
import type { Location } from '../types/Location';

interface LocationFilters {
  page?: number;
  name?: string;
  type?: string;
  dimension?: string;
}

export async function getLocations(page = 1) {
  const response = await api.get<ApiResponse<Location>>('/location', {
    params: {
      page,
    },
  });

  return response.data;
}

export async function getLocationById(id: number | string) {
  const response = await api.get<Location>(`/location/${id}`);

  return response.data;
}

export async function getLocationsByIds(ids: Array<number | string>) {
  const response = await api.get<Location[]>(`/location/${ids.join(',')}`);

  return response.data;
}

export async function searchLocations(filters: LocationFilters) {
  const response = await api.get<ApiResponse<Location>>('/location', {
    params: filters,
  });

  return response.data;
}
