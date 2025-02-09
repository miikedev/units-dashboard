
import { defineConfig } from "vite";  
import { resolve } from "path";  
import react from "@vitejs/plugin-react";  
import { VitePWA } from "vite-plugin-pwa";  

export default defineConfig({  
  server: {  
    proxy: {  
      '/api': {  
        target: "https://units-backend.vercel.app/api/v1",  
        changeOrigin: true,  
        rewrite: (path) => path.replace(/^\/api/, ''),  
      },  
    },
    host: '0.0.0.0',
    allowedHosts: ['81f7b374-e659-4342-add1-5a7c050a61e1-00-dmtn53zmfm9m.pike.replit.dev'],
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
    minify: 'terser',  
    terserOptions: {  
      compress: {  
        drop_console: true,  
        drop_debugger: true,  
      },  
    },  
  },  
});
