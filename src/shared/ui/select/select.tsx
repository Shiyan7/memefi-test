import { clsx } from 'clsx';
import { For, type JSX, splitProps } from 'solid-js';

import { Icon } from '@/shared/ui/icon';

type BaseSelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement>;

export interface SelectItem {
  value: string;
  label: string;
}

interface SelectProps extends BaseSelectProps {
  options: SelectItem[];
  onSelectChange: (value: string) => void;
  placeholder?: string;
}

export function Select(props: SelectProps) {
  const [local, rest] = splitProps(props, [
    'class',
    'options',
    'placeholder',
    'onSelectChange',
    'value',
  ]);

  return (
    <label
      class={clsx(
        'relative inline-flex items-center',
        'border border-gray-200 rounded-md h-8',
        'overflow-hidden cursor-pointer',
        local.class,
      )}
    >
      <select
        class={clsx(
          'w-full appearance-none bg-transparent',
          'py-2.5 pl-3 pr-10 text-sm text-black placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-xl',
        )}
        onChange={(e) => local.onSelectChange(e.target.value)}
        {...rest}
      >
        <For each={local.options}>
          {(option) => (
            <option
              selected={local.value === option.value}
              value={option.value}
            >
              {option.label}
            </option>
          )}
        </For>
      </select>

      <Icon
        class="absolute right-3 pointer-events-none text-gray-600 w-4 h-4"
        name="common:chevron-down"
      />
    </label>
  );
}
