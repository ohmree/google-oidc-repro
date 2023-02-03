/// <reference types="vitest" />

import { defineConfig } from 'vite';
import vavite from 'vavite';
import swc from '@ohmree/unplugin-swc/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  ssr: {
    external: ['reflect-metadata'],
  },
  server: { port: 3000 },
  plugins: [
    tsconfigPaths(),
    swc(),
    vavite({
      handlerEntry: '/src/main.ts',
      serveClientAssetsInDev: true,
    }),
  ],
  test: {
    globals: true,
  },
});
