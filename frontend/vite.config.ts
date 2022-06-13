import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Unocss from "unocss/vite";
import { presetUno, presetAttributify, presetIcons } from "unocss";
import { resolve } from "path";

export default defineConfig({
  envDir: './env',
  server: {
    port: 3001,
    open: true,
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },
  plugins: [
    vue(),

    Pages({
      dirs: "src/views",
      importMode: "async",
      extendRoute(route) {
        if (route.path === '/') {
          return { ...route, redirect: "posts" }
        }
      }
    }),

    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true,
        }),
      ],
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ["vue", "vue-router"],
      dts: "src/auto-imports.d.ts",
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      resolvers: [NaiveUiResolver()],
      dirs: ["src/components"],
      directoryAsNamespace: true,
      dts: "src/components.d.ts",
    }),
  ],
});