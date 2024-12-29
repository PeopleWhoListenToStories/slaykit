import { Plugin } from 'vite';
import { createFilter } from '@rollup/pluginutils';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';

interface AutoDecimalOptions {
  include?: string[];
  exclude?: string | string[];
  isExcludedFile?: (id: string) => boolean; // 新增的动态排除选项
}

const OPERATOR_MAP: Record<string, string> = {
  '+': 'add',
  '-': 'sub',

  '*': 'mul',
  '/': 'div',
};

const ASSIGNMENT_OPERATOR_MAP: Record<string, string> = {
  '+=': 'add',
  '-=': 'sub',
  '*=': 'mul',
  '/=': 'div',
};

/**
 * Vite Plugin: 自动处理 JS 数字运算的精度问题
 */
export const autoDecimalPlugin = (options: AutoDecimalOptions = {}): Plugin => {
  const { include = ['**/*.ts', '**/*.js', '**/*.vue', '**/*.tsx'], exclude = 'node_modules/**', isExcludedFile } = options;
  // 使用 `createFilter` 来生成文件过滤器
  const filter = createFilter(include, exclude);

  return {
    name: 'auto-decimal-plugin',

    transform(code: string, id: string) {
      // 如果文件不符合包含规则或符合排除规则，跳过文件
      if (!filter(id) || (isExcludedFile && isExcludedFile(id))) {
        return null;
      }

      let shouldAddImport = false;

      // 使用 Babel 解析代码
      const ast = parse(code, {
        sourceType: 'module',
        attachComment: true,
        plugins: ['typescript', 'jsx', 'decorators-legacy'],
      });

      // 标记下一行代码是否需要跳过
      let skipNextLine = false;

      // 检查节点是否为数字字面量，支持负数
      const isNumericLiteral = (node: t.Node) =>
        t.isNumericLiteral(node) || (t.isUnaryExpression(node) && node.operator === '-' && t.isNumericLiteral(node.argument));

      traverse(ast, {
        enter(path) {
          const { node } = path;

          // 检查节点的 leadingComments 是否包含 @no-decimal 注释
          if (node.leadingComments) {
            node.leadingComments.forEach((comment) => {
              if (comment.value.includes('no-decimal')) {
                skipNextLine = true; // 标记跳过下一行的运算
              }
            });
          }

          // 如果当前行需要跳过，则跳过下一行的运算
          if (skipNextLine && (t.isBinaryExpression(node) || t.isAssignmentExpression(node))) {
            skipNextLine = false; // 重置标记
            path.skip(); // 跳过这行转换
          }
        },

        BinaryExpression(path) {
          if (skipNextLine) return; // 如果被标记跳过，直接返回

          const { node } = path;
          const operatorFunction = OPERATOR_MAP[node.operator];

          if (operatorFunction && isNumericLiteral(node.left) && isNumericLiteral(node.right)) {
            const left = t.newExpression(t.identifier('Decimal'), [node.left]);
            const right = t.newExpression(t.identifier('Decimal'), [node.right]);

            path.replaceWith(t.callExpression(t.memberExpression(left, t.identifier(operatorFunction)), [right]));
            shouldAddImport = true;
          }
        },

        AssignmentExpression(path) {
          if (skipNextLine) return; // 如果被标记跳过，直接返回

          const { node } = path;
          const operatorFunction = ASSIGNMENT_OPERATOR_MAP[node.operator];

          if (operatorFunction && isNumericLiteral(node.right)) {
            const left = t.newExpression(t.identifier('Decimal'), [node.left]);
            const right = t.newExpression(t.identifier('Decimal'), [node.right]);

            path.replaceWith(
              t.assignmentExpression('=', node.left, t.callExpression(t.memberExpression(left, t.identifier(operatorFunction)), [right])),
            );
            shouldAddImport = true;
          }
        },
      });

      // 添加 Decimal.js 的导入语句
      if (shouldAddImport) {
        ast.program.body.unshift(
          t.importDeclaration([t.importDefaultSpecifier(t.identifier('Decimal'))], t.stringLiteral('decimal.js-light')),
        );
      }

      // 生成新的代码
      const output = generate(ast, {}, code);
      return {
        code: output.code,
        map: output.map,
      };
    },
  };
};
