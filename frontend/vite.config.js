import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: '0.0.0.0',
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4001',
        changeOrigin: true,
        secure: false,
      },
      '/Uploads': {
        target: 'http://127.0.0.1:4001',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://127.0.0.1:4001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
