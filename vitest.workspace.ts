import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'packages/*',
  // {
  //   extends: './vite.config.ts',
  //   test: {
  //     include: ['tests/**/*.{browser}.test.{ts,js}'],
  //     name: 'happy-dom',
  //     environment: 'happy-dom',
  //   }
  // },
  // {
  //   test: {
  //     include: ['tests/**/*.{node}.test.{ts,js}'],
  //     name: 'node',
  //     environment: 'node',
  //   }
  // }
]);
