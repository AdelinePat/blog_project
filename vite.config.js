import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        form: resolve(__dirname, "src/form/form.html"),
      },
    },
  },
  server: {
    host: "0.0.0.0", // container listens on all interfaces
    watch: {
      usePolling: true, // Windows + Docker fix
      interval: 100,
    },
    hmr: {
      host: "localhost", // browser connects to localhost: mapped by Docker
    },
  },
});
