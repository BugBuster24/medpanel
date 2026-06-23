import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mfe_patients",
      exposes: {
        "./Patients": "./src/Patients",
      },
      shared: ["react", "react-dom", "@tanstack/react-query"],
    }),
  ],
  resolve: {
    alias: {
      "shared-lib": path.resolve(__dirname, "../shared-lib/dist/index.mjs"),
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
  },
  server: {
    port: 5002,
    cors: true,
  },
  preview: {
    port: 5002,
    cors: true,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  // This block configures Vitest
  test: {
    globals: true, // allows using `describe`, `it`, `expect` without imports
    environment: "jsdom", // simulates a browser DOM
    setupFiles: ["./src/test/setup.ts"], // runs before every test file
  },
});
