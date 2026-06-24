import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell",
      // remotes tells the shell WHERE to find each MFE's
      // Module Federation manifest at runtime.
      // The key is the module name used in import statements.
      // The value is the URL to the remoteEntry file.
      remotes: {
        mfe_dashboard:
          "https://medpanel-dashboard.vercel.app/assets/remoteEntry.js",
        mfe_patients:
          "https://medpanel-patients.vercel.app/assets/remoteEntry.js",
        mfe_appointments:
          "https://medpanel-appointments.vercel.app/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "@tanstack/react-query", "recharts"],
    }),
  ],
  resolve: {
    alias: {
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
  },
  server: {
    port: 5000,
    cors: true,
  },
  preview: {
    port: 5000,
    cors: true,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
