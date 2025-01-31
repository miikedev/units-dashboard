import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: "http://localhost:3000/api/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    react(),
    VitePWA({ registerType: 'autoUpdate' })
  ],
  resolve: {
    alias: {
      "@": resolve("./src"),
    },
  },
  build: {
    minify: 'terser', // Ensure Terser is used
    terserOptions: {
      compress: {
        drop_console: true, // Remove all console.*
        drop_debugger: true, // Remove debugger statements
      },
    },
  },
});
