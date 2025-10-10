import {
  type Accessor,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  untrack,
} from 'solid-js';

export interface Options {
  containerTarget: Accessor<HTMLElement>;
  wrapperTarget: Accessor<HTMLElement>;
  itemSize: number;
}

export const useVirtualList = <T = unknown>(
  list: Accessor<T[]>,
  options: Options,
) => {
  const [range, setRange] = createSignal([0, 0]);

  const calculateRange = () => {
    const container = options.containerTarget();
    const wrapper = options.wrapperTarget();
    const wrapperStyle = getComputedStyle(wrapper);
    const scrollSize =
      container.scrollTop -
      parseFloat(wrapperStyle.borderTopWidth) -
      parseFloat(wrapperStyle.paddingTop);
    const clientSize = container.clientHeight;

    const start = Math.floor(Math.max(scrollSize, 0) / options.itemSize);
    const end = Math.ceil(
      Math.max(scrollSize + clientSize, 0) / options.itemSize,
    );

    setRange([start, end]);

    const totalSize = options.itemSize * list().length;
    const translateSize = start * options.itemSize;
    wrapper.style.marginTop = `${translateSize}px`;
    wrapper.style.height = `${totalSize - translateSize}px`;
  };

  createEffect(() => {
    const container = options.containerTarget();

    const onScroll = () => {
      untrack(calculateRange);
    };

    container.addEventListener('scroll', onScroll);

    onCleanup(() => {
      container.removeEventListener('scroll', onScroll);
    });
  });

  createEffect(() => {
    calculateRange();
  });

  const rangeList = createMemo(() => list().slice(...range()));

  return { list: rangeList };
};
