// tests/removeConsolePlugin.test.ts
import { describe, it, expect } from 'vitest';
import { Plugin } from 'vite';
import { removeConsolePlugin } from '../src';

describe('removeConsolePlugin', () => {
  const plugin = removeConsolePlugin();

  // Helper function to simulate transform behavior of Vite plugins
  const transformCode = async (code: string, id: string) => {
    const result = await plugin.transform(code, id);
    return result?.code;
  };

  it('should remove console.log calls by default', async () => {
    const code = `
      console.log('This should be removed');
      console.info('This should stay');
    `;
    const transformedCode = await transformCode(code, 'test.js');

    // Verify console.log is removed
    expect(transformedCode).not.toContain('console.log');
    // Verify console.info stays
    expect(transformedCode).toContain('console.info');
  });

  it('should respect the "include" option', async () => {
    const code = `
      console.log('This should be removed');
      console.warn('This should stay');
    `;
    const transformedCode = await transformCode(code, 'test.js');
    const pluginWithInclude = removeConsolePlugin({ include: ['log'] });

    // Verify console.log is removed, while other console methods remain
    expect(transformedCode).not.toContain('console.log');
    expect(transformedCode).toContain('console.warn');
  });

  it('should respect the "exclude" option', async () => {
    const code = `
      console.log('This should stay');
      console.warn('This should be removed');
    `;
    const transformedCode = await transformCode(code, 'test.js');
    const pluginWithExclude = removeConsolePlugin({ exclude: ['warn'] });

    // Verify console.warn is not removed, while others are
    expect(transformedCode).not.toContain('console.warn');
    expect(transformedCode).toContain('console.log');
  });

  it('should prioritize "include" over "exclude"', async () => {
    const code = `
      console.log('This should be removed');
      console.warn('This should be removed');
    `;
    const transformedCode = await transformCode(code, 'test.js');
    const pluginWithIncludeAndExclude = removeConsolePlugin({
      include: ['log'],
      exclude: ['warn'],
    });

    // Verify console.log is removed, even though warn is excluded
    expect(transformedCode).not.toContain('console.log');
    expect(transformedCode).toContain('console.warn');
  });

  it('should not transform non .js/.ts files', async () => {
    const code = `
      console.log('This should not be removed in a .vue file');
    `;
    const transformedCode = await transformCode(code, 'test.vue');

    // .vue files should not be transformed
    expect(transformedCode).toBeNull();
  });

  it('should not transform if no console methods match', async () => {
    const code = `
      console.trace('This should stay');
    `;
    const transformedCode = await transformCode(code, 'test.js');
    const pluginWithExcludeTrace = removeConsolePlugin({ exclude: ['trace'] });

    // console.trace should stay if it's excluded
    expect(transformedCode).toContain('console.trace');
  });
});
