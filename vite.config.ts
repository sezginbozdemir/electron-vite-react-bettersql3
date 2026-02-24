import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import electron from "vite-plugin-electron/simple";
import path from "path";
import { rmSync } from "fs";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isProd = command === "build";
  rmSync("dist-electron", { recursive: true, force: true });

  return {
    base: "./",
    plugins: [
      react(),
      tailwindcss(),
      tanstackRouter(),
      electron({
        main: {
          entry: "electron/main/index.ts",
          vite: {
            build: {
              rollupOptions: {
                external: ["better-sqlite3"],
              },
            },
          },
        },
        preload: { input: "electron/preload/index.ts" },
        renderer: {},
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: true,
      strictPort: true,
    },
    build: {
      outDir: path.join(__dirname, "dist"),
      cssCodeSplit: true,
      drop: isProd ? ["console", "debugger"] : [],
      rollupOptions: {
        output: {
          sourcemap: false,
          entryFileNames: "js/[name].[hash].js",
          chunkFileNames: "js/[name].[hash].js",
          assetFileNames: "[ext]/[name].[hash].[ext]",
        },
      },
    },
  };
});
