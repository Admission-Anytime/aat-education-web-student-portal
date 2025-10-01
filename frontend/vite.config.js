import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
 
  /*server: {
    proxy: {
      '/api': 'http://localhost:8080',
    }
  },*/
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4001", // backend
        changeOrigin: true,
        secure: false,
      },
    },
  }
  
})

