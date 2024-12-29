import { defineConfig } from 'vitest/config';

export default defineConfig({
  optimizeDeps: {
    entries: [],
  },
  test: {
    setupFiles: './vitest.setup.ts',
    include: ['tests/*.test.ts', 'tests/**/*.test.ts', 'tests/**/*.spec.ts'],
    coverage: {
      provider: 'istanbul', // or 'v8'
      reporter: ['html', 'json'],
      reportsDirectory: './html/coverage',
    },
    reporters: ['html'],
  },
});
