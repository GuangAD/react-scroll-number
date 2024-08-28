import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      rollupTypes: true,
    }),
  ],
  build: {
    target: "esnext",
    copyPublicDir: false,
    sourcemap: true,
    minify: true,
    cssCodeSplit: true,
    lib: {
      entry: "./src/index.ts",
      name: "ScrollNumber",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
    emptyOutDir: true,
  },
});
