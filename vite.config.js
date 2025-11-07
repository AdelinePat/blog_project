import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "./src",
  // server: {
  //   host: true, // 0.0.0.0
  //   port: 5173,
  //   hmr: {
  //     host: "localhost", // or your Docker host IP
  //     port: 5174,
  //   },
  // },
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
});
