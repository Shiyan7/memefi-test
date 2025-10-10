import { createEffect, For, on } from 'solid-js';

import { useVirtualList } from '@/shared/hooks/use-virtual-list';
import { ControlledInput } from '@/shared/ui/controlled-input';
import { Icon } from '@/shared/ui/icon';
import { Select } from '@/shared/ui/select';

import { priceRanges } from './config/prices.config';
import { sortDirections, sortFields } from './config/sort.config';
import { tableVM } from './table.vm';

const setScrollIndex = (index: number) => {
  const params = new URLSearchParams(window.location.search);
  params.set('scroll', index.toString());
  const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
  window.history.replaceState(null, '', newUrl);
};

const getScrollIndex = () => {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get('scroll') || '0');
};

export function Table() {
  let containerRef: HTMLDivElement | undefined;
  let wrapperRef: HTMLDivElement | undefined;

  const { list } = useVirtualList(() => tableVM.filteredData, {
    containerTarget: () => containerRef!,
    wrapperTarget: () => wrapperRef!,
    itemSize: 40,
  });

  createEffect(
    on(
      () => tableVM.filteredData.length,
      () => {
        requestAnimationFrame(() => {
          if (containerRef) {
            containerRef.scrollTop = getScrollIndex();
          }
        });
      },
    ),
  );

  return (
    <div class="flex flex-col bg-white border border-gray-200 p-5 rounded-lg">
      <h1 class="text-xl font-medium mb-3">Virtualized catalog</h1>
      <div class="grid sm:grid-cols-5 gap-2 mb-4">
        <div class="relative sm:col-span-2">
          <ControlledInput
            class="outline-none w-full border pl-6.5 pr-2 text-black placeholder:text-gray-400 text-sm border-gray-200 h-8 rounded-md"
            value={tableVM.searchQuery}
            onInput={tableVM.onInputSearch}
            placeholder="Search..."
          />
          <Icon
            class="absolute top-1/2 left-2 -translate-y-1/2 pointer-events-none"
            width={14}
            height={14}
            name="common:search"
          />
        </div>
        <Select
          value={tableVM.priceRange}
          options={priceRanges}
          name="price-select"
          onSelectChange={tableVM.onPriceSelect}
        />
        <Select
          value={tableVM.sortField}
          options={sortFields}
          name="sort-field"
          onSelectChange={tableVM.onSortFieldSelect}
        />
        <Select
          value={tableVM.sortDirection}
          options={sortDirections}
          name="sort-dir"
          onSelectChange={tableVM.onSortDirectionSelect}
        />
      </div>
      <div
        class="h-[361px] overflow-auto border border-gray-200 rounded-md"
        ref={containerRef}
        onScroll={(ev) => setScrollIndex(Math.floor(ev.target.scrollTop))}
      >
        <div ref={wrapperRef}>
          <For each={list()}>
            {(item) => (
              <div class="grid grid-cols-[40%_20%_40%] items-center h-10 px-4 border-b border-gray-200">
                <span>{item.name}</span>
                <span class="text-right">${item.price.toFixed(2)}</span>
                <span class="text-right">{item.updatedAt}</span>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}
