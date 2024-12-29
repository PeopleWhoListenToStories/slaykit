import { defineConfig, UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import { terser } from "rollup-plugin-terser";
import { autoDecimalPlugin } from "@slaykit/auto-decimal-plugin";
import { removeConsolePlugin } from "@slaykit/remove-console-plugin";

const config: UserConfigExport = {
  build: {
    rollupOptions: {
      plugins: [
        terser({
          output: {
            // 保留所有注释
            comments: "all",
          },
        }),
      ],
    },
  },
  plugins: [
    vue(),
    UnoCSS(),
    autoDecimalPlugin({
      include: ["**/*.ts", "**/*.js", "**/*.vue", "**/*.tsx"],
      exclude: ["node_modules/**"],
      // 或者根据文件名/路径动态排除某些文件
      // isExcludedFile: (id) => {
      //   return id.includes("some-special-file"); // 根据条件判断是否排除
      // }
    }),
    removeConsolePlugin({
      include: [], // Remove `console.log`
      exclude: ["warn", "error"], // Retain `console.warn` and `console.error`
    }),
  ],
  server: {
    // proxy: {
    //   '/api': {
    //     target: 'https://server.slay.leixu.live/',
    //     pathRewrite: {
    //       '^/api': '',
    //       autoRewrite: true, // Add the missing autoRewrite property
    //     }
    //   },
    // }
  },
};

export default defineConfig(config);
