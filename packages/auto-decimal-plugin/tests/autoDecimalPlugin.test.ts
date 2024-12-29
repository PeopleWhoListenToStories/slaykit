// tests/autoDecimalPlugin.test.ts
import { describe, it, expect, vi } from 'vitest';
import { Plugin } from 'vite';
import { autoDecimalPlugin } from '../src';

describe('autoDecimalPlugin', () => {
  const plugin = autoDecimalPlugin();

  // Helper function to simulate transform behavior of Vite plugins
  const transformCode = async (code: string, id: string) => {
    const result = await plugin.transform(code, id);
    return result?.code;
  };

  it('should add Decimal.js import when performing numeric operations', async () => {
    const code = `
      const result = 1 + 1;
    `;
    const transformedCode = await transformCode(code, 'test.js');

    // Check if the Decimal.js import was added at the top
    expect(transformedCode).toMatch(/^import Decimal from 'decimal.js-light';/);

    // Check if the operator is replaced with Decimal operations
    expect(transformedCode).toContain('new Decimal(1)');
    expect(transformedCode).toContain('new Decimal(1)');
    expect(transformedCode).toContain('.add(new Decimal(1))');
  });

  it('should skip lines with `@no-decimal` comment', async () => {
    const code = `
      // @no-decimal
      const result = 1 + 1;
    `;
    const transformedCode = await transformCode(code, 'test.js');

    // The code should remain unchanged because of the @no-decimal comment
    expect(transformedCode).toBe(code);
  });

  it('should handle assignment operations correctly', async () => {
    const code = `
      let value = 1;
      value += 2;
    `;
    const transformedCode = await transformCode(code, 'test.js');

    // Check if Decimal is used for assignment operations
    expect(transformedCode).toContain('new Decimal(1)');
    expect(transformedCode).toContain('new Decimal(2)');
    expect(transformedCode).toContain('.add(new Decimal(2))');
  });

  it('should not transform code if the file is excluded', async () => {
    const code = `
      const value = 10 * 2;
    `;
    const transformedCode = await transformCode(code, 'node_modules/some-library.js');

    // If the file is excluded (by default, node_modules/**), the code should remain unchanged
    expect(transformedCode).toBeNull();
  });

  it('should transform complex expressions with multiple operators', async () => {
    const code = `
      const result = (1 + 2) * 3;
    `;
    const transformedCode = await transformCode(code, 'test.js');

    // Check if the multiple operators are transformed into Decimal operations
    expect(transformedCode).toContain('.add(new Decimal(2))');
    expect(transformedCode).toContain('.mul(new Decimal(3))');
  });

  it('should exclude files dynamically via the `isExcludedFile` option', async () => {
    const customPlugin = autoDecimalPlugin({
      isExcludedFile: (id) => id.includes('excluded.js'),
    });

    const code = `
      const value = 10 / 2;
    `;
    const transformedCode = await customPlugin.transform(code, 'excluded.js');

    // The code should not be transformed as the file is excluded by `isExcludedFile`
    expect(transformedCode).toBeNull();
  });
});
