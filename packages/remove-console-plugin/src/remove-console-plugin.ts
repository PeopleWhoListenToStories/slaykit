import { Plugin } from 'vite';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';

interface RemoveConsoleOptions {
  exclude?: string[]; // 指定保留的 console 类型
  include?: string[]; // 指定要删除的 console 类型，优先级高于 exclude
}

const DEFAULT_CONSOLE_METHODS = ['log', 'info', 'warn', 'error', 'debug', 'trace'];

export const removeConsolePlugin = (options: RemoveConsoleOptions = {}): Plugin => {
  const { exclude = [], include = DEFAULT_CONSOLE_METHODS } = options;
  // 确定要移除的 console 方法
  const methodsToRemove = include.length ? include : DEFAULT_CONSOLE_METHODS.filter((method) => !exclude.includes(method));

  return {
    name: 'remove-console-plugin',

    transform(code: string, id: string) {
      // 只处理 .js 和 .ts 文件
      if (!id.endsWith('.js') && !id.endsWith('.ts')) return null;

      // 使用 Babel 解析代码
      const ast = parse(code, {
        sourceType: 'module',
        plugins: ['typescript', 'jsx'],
      });

      let modified = false;

      traverse(ast, {
        CallExpression(path) {
          const { node } = path;

          // 检查是否是 console 调用
          if (
            t.isMemberExpression(node.callee) &&
            t.isIdentifier(node.callee.object, { name: 'console' }) &&
            t.isIdentifier(node.callee.property) &&
            methodsToRemove.includes(node.callee.property.name)
          ) {
            path.remove(); // 删除匹配的 console 调用
            modified = true;
          }
        },
      });

      // 如果 AST 被修改，生成新的代码
      if (modified) {
        const output = generate(ast, {}, code);
        return {
          code: output.code,
          map: output.map,
        };
      }

      return null; // 如果没有修改，不返回任何内容
    },
  };
};
