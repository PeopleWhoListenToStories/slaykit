# 🔥remove-console-plugins

A **Vite plugin** to remove specific `console` statements (`log`, `info`, `warn`, `error`, `debug`, etc.) from your JavaScript/TypeScript code during the build process. The plugin is fully configurable, allowing you to dynamically specify which `console` methods to remove or retain.

---

## ✨ Features

- Remove unwanted `console` statements to reduce bundle size in production.
- Fully customizable: specify which `console` methods to remove or retain.
- Works with JavaScript, TypeScript, and JSX/TSX files.
- Easy to integrate with Vite projects.

---

## 📦 Installation

Install the plugin via npm or yarn or pnpm:

```bash
# Using npm
npm install @slaykit/remove-console-plugin --save-dev

# Using yarn
yarn add @slaykit/remove-console-plugin --dev

# Using pnpm
pnpm add @slaykit/remove-console-plugin --save-dev
```

## 🚀 Usage

Add the plugin to your vite.config.js or vite.config.ts:

```javascript
import { defineConfig } from 'vite';
import { removeConsolePlugins } from '@slaykit/remove-console-plugin';

export default defineConfig({
  plugins: [
    removeConsolePlugins({
      include: [], // Remove
      exclude: ['error', 'warn'], // Retain `console.error` and `console.warn`, remove others
    }),
  ],
});
```

## ⚙️ API Reference

The plugin accepts the following configuration options:

| Option  | Type     | Default Value                                        | Description                                                                            |
| ------- | -------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------- |
| include | string[] | `['log', 'info', 'warn', 'error', 'debug', 'trace']` | Specify the console methods to remove. This takes priority over exclude.               |
| exclude | string[] | `[]`                                                 | Specify the console methods to retain. If include is provided, this option is ignored. |

## 贡献

如果你有任何改进建议或发现了问题，欢迎通过 GitHub Issues 向我们反馈，或者提交 Pull Request。
