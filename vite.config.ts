import svg from '@neodx/svg/vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import devtools from 'solid-devtools/vite';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [
    solid(),
    tailwindcss(),
    svg({
      inputRoot: 'src/shared/ui/icon/assets',
      output: 'public/sprites',
      fileName: '{name}.{hash:8}.svg',
      metadata: 'src/shared/ui/icon/sprite.gen.ts',
    }),
    devtools({
      autoname: true,
      locator: {
        targetIDE: 'webstorm',
        componentLocation: true,
        jsxLocation: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
