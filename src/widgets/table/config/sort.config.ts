import type { CatalogItem } from '@/shared/api/types';
import type { SelectItem } from '@/shared/ui/select';

export const sortFields: SelectItem[] = [
  { value: 'all', label: 'Sort by:' },
  { value: 'name', label: 'Name' },
  { value: 'price', label: 'Price' },
  { value: 'updatedAt', label: 'Date' },
];

export const sortDirections: SelectItem[] = [
  { value: 'all', label: 'Direction' },
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
];

export type SortField = (typeof sortFields)[number]['value'];
export type SortDirection = (typeof sortDirections)[number]['value'];

export const sortComparators: Record<
  Exclude<SortField, 'all'>,
  (a: CatalogItem, b: CatalogItem) => number
> = {
  name: (a, b) => a.name.localeCompare(b.name),
  price: (a, b) => a.price - b.price,
  updatedAt: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
};
