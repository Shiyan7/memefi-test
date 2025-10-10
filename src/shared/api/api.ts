import type { CatalogItem } from '@/shared/api/types';

class Api {
  fetchCatalog = async (): Promise<CatalogItem[]> => {
    return this.makeRequest('/data.json');
  };

  private makeRequest = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to load data');
    return response.json();
  };
}

export const api = new Api();
