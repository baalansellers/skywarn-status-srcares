import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "./src/main.ts",
      name: "MyLibrary",
    },
  },
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
      include: "src/lib/*.svelte",
      exclude: "node_modules/**/*.svelte",
    }),
    svelte({
      compilerOptions: {
        customElement: false,
      },
      include: "node_modules/**/*.svelte",
      exclude: "src/lib/*.svelte",
    })
  // plugins: [
  //   svelte({
  //     include: "src/lib/*.svelte",
  //     compilerOptions: {
  //       customElement: true,
  //     },
  //   }),
  //   svelte({
  //     exclude: "node_modules/svelte-loading-spinners/dist/*.svelte",
  //     compilerOptions: {
  //       customElement: false,
  //     },
  //   }),
  ],
});
