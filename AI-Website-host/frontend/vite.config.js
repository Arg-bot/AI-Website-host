import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/AI-Website-host/',
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Proxies /api/* → http://localhost:3000/api/*
      // Avoids CORS issues in development
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
