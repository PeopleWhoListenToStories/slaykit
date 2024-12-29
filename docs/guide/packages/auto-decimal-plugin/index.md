---
category: UA
---

# 🔥auto-decimal-plugin

## `auto-decimal-plugin` 是一个 Vite 插件，旨在自动处理 JavaScript 数字运算中的精度问题。它通过将数字运算（如加法、减法、乘法、除法）转换为使用 `Decimal.js` 进行的精确运算，从而避免 JavaScript 默认浮点数计算精度问题

## ✨ Features

- 自动将数值计算表达式转换为 `Decimal.js` 的精确计算。
- 支持加法、减法、乘法、除法运算。
- 支持赋值操作符（如 `+=`、`-=`、`*=`、`/=`）的转换。
- 使用 `decimal.js-light` 库，体积较小，适合前端使用。
- 支持 `.ts`, `.js`, `.vue`, `.tsx` 等文件类型。

---

## 📦 Installation

Install the plugin via npm or yarn or pnpm:

```bash
# Using npm
npm install @slaykit/auto-decimal-plugin --save-dev

# Using yarn
yarn add @slaykit/auto-decimal-plugin --dev

# Using pnpm
pnpm add @slaykit/auto-decimal-plugin --save-dev
```

## 🚀 Usage

Add the plugin to your vite.config.js or vite.config.ts:

```javascript
import { defineConfig } from 'vite';
import { autoDecimalPlugin } from '@slaykit/auto-decimal-plugin';

export default defineConfig({
  plugins: [
    autoDecimalPlugin({
      // 配置 include 和 exclude
      include: ['**/*.ts', '**/*.js', '**/*.vue', '**/*.tsx'],
      exclude: ['node_modules/**'],
      // 或者根据文件名/路径动态排除某些文件
      isExcludedFile: (id) => {
        return id.includes('some-special-file'); // 根据条件判断是否排除
      },
    }),
  ],
});
```

## 📝 Example

```javascript
在你的业务代码中，可以通过添加 /* @no-decimal */ 注释来控制哪些文件或代码块不应用数字精度处理。以下是一个示例：
/* @no-decimal */
const result = 0.1 + 0.2;  // 此处的代码不会被插件处理

```

## ⚙️ API Reference

The plugin accepts the following configuration options:

| 选项           | 类型                    | 默认值                                           | 说明                                                                                            |
| -------------- | ----------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| include        | string[]                | `["**/*.ts", "**/*.js", "**/*.vue", '**/*.tsx']` | 包含的文件类型，可以传入一个数组。支持通配符。                                                  |
| exclude        | string[]                | `["node_modules/**"]`                            | 排除的文件类型，可以传入一个数组。支持通配符。                                                  |
| isExcludedFile | (id: string) => boolean | null                                             | 可选的函数，用于动态决定是否排除某个文件。接受文件路径作为参数，如果返回 true，该文件将被排除。 |

## 贡献

如果你有任何改进建议或发现了问题，欢迎通过 GitHub Issues 向我们反馈，或者提交 Pull Request。
