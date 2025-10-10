import { clsx } from 'clsx';
import { createMemo, type JSX, splitProps } from 'solid-js';

import { sprites, type SpritesMeta } from './sprite.gen';

interface IconProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
  name: IconName;
}

export type IconName = {
  [Key in keyof SpritesMeta]: `${Key}:${SpritesMeta[Key]}`;
}[keyof SpritesMeta];

export function Icon(props: IconProps) {
  const [local, rest] = splitProps(props, ['name', 'class']);

  const meta = createMemo(() => getIconMeta(local.name));
  const { viewBox, width, height } = meta().symbol;

  return (
    <svg
      class={clsx(
        'select-none fill-current inline-block text-inherit box-content',
        local.class,
      )}
      width={width}
      height={height}
      viewBox={viewBox}
      aria-hidden
      {...rest}
    >
      <use href={meta().href} />
    </svg>
  );
}

function getIconMeta(name: IconName) {
  const [spriteName, iconName] = name.split(':');
  const item = sprites.experimental_get(spriteName!, iconName!, {
    baseUrl: '/sprites/',
  });
  if (!item) {
    console.error(`Icon "${name}" is not found in "${spriteName}" sprite`);
    return sprites.experimental_get('general', 'help', {
      baseUrl: '/sprites/',
    })!;
  }
  return item;
}
