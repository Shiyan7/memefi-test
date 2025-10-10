import { api } from '@/shared/api';
import type { CatalogItem } from '@/shared/api/types';
import { debounce } from '@/shared/lib/debounce';
import { ViewModel } from '@/shared/view-model';

import { type PriceRange, priceRanges } from './config/prices.config';
import {
  sortComparators,
  type SortDirection,
  type SortField,
} from './config/sort.config';

class TableViewModel extends ViewModel {
  data: CatalogItem[] = [];
  filteredData: CatalogItem[] = [];
  searchQuery = '';
  priceRange = 'all';
  sortField = 'all';
  sortDirection = 'all';

  private readonly debouncedApplyFilters = debounce(() => this.applyFilters());
  private readonly debouncedSyncUrl = debounce(() => this.syncToUrl());

  private readonly paramsMap = {
    q: 'searchQuery',
    price: 'priceRange',
    sort: 'sortField',
    dir: 'sortDirection',
  } as const;

  constructor() {
    super();
    this.initUrlSync();
    this.loadData();
  }

  onInputSearch = (value: string) => {
    this.searchQuery = value;
    this.debouncedApplyFilters();
    this.debouncedSyncUrl();
  };

  onPriceSelect = (rangeValue: string) => {
    this.priceRange = rangeValue;
    this.applyFilters();
    this.syncToUrl();
  };

  onSortFieldSelect = (field: string) => {
    this.sortField = field as SortField;
    this.applyFilters();
    this.syncToUrl();
  };

  onSortDirectionSelect = (direction: string) => {
    this.sortDirection = direction as SortDirection;
    this.applyFilters();
    this.syncToUrl();
  };

  private initUrlSync() {
    this.restoreFromUrl();
    window.addEventListener('popstate', this.handlePopState);
  }

  private handlePopState = () => {
    this.restoreFromUrl();
    this.applyFilters();
  };

  private syncToUrl() {
    const params = new URLSearchParams();

    Object.entries(this.paramsMap).forEach(([key, stateKey]) => {
      const value = this[stateKey];
      if (value && value !== 'all') {
        params.set(key, String(value));
      }
    });

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState(null, '', newUrl);
  }

  private restoreFromUrl() {
    const params = new URLSearchParams(window.location.search);

    Object.entries(this.paramsMap).forEach(([key, stateKey]) => {
      const value = params.get(key);
      if (value) this[stateKey] = value as any;
    });
  }

  private applyFilters() {
    let result = [...this.data];

    result = this.createPriceFilter(result, this.priceRange);
    result = this.createSearchFilter(result, this.searchQuery);
    result = this.createSorter(result, this.sortField, this.sortDirection);

    this.filteredData = result;
  }

  private createPriceFilter(items: CatalogItem[], rangeValue: string) {
    if (rangeValue === 'all') return items;

    const range = priceRanges.find((r) => r.value === rangeValue) as PriceRange;
    const { min = 0, max = Infinity } = range;

    return items.filter((item) => item.price >= min && item.price < max);
  }

  private createSearchFilter(items: CatalogItem[], query: string) {
    const trimmed = query.trim();
    if (!trimmed) return items;

    const normalized = trimmed.toLowerCase();
    return items.filter((item) => item.name.toLowerCase().includes(normalized));
  }

  private createSorter(items: CatalogItem[], field: string, direction: string) {
    if (field === 'all' || direction === 'all') return items;

    const comparator = sortComparators[field];
    const modifier = direction === 'asc' ? 1 : -1;

    return items.sort((a, b) => comparator(a, b) * modifier);
  }

  private async loadData() {
    this.data = await api.fetchCatalog();
    this.applyFilters();
  }
}

export const tableVM = new TableViewModel();
