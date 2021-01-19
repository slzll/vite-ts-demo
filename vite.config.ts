import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import babel from "vite-babel-plugin";

export default defineConfig({
  plugins: [vue(), babel()],
  optimizeDeps: {
    include: [""],
  },
});
