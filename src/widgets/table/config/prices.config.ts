import type { SelectItem } from '@/shared/ui/select';

export interface PriceRange extends SelectItem {
  min?: number;
  max?: number;
}

export const priceRanges: PriceRange[] = [
  { value: 'all', label: 'Price' },
  { value: 'under-50', label: 'Меньше 50$', max: 50 },
  { value: '50-100', label: '50$ – 100$', min: 50, max: 100 },
  { value: '100-500', label: '100$ – 500$', min: 100, max: 500 },
  { value: '500-1000', label: '500$ – 1000$', min: 500, max: 1000 },
  { value: 'over-900', label: 'Больш 900$', min: 900 },
];
