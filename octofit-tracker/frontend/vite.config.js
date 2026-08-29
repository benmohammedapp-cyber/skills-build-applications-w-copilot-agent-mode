import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Proxy any /api requests to the backend on port 8000 so
    // the frontend can call `/api/*` from the Codespaces 5173 origin
    // without triggering cross-port tunnel auth redirects.
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
  },
})
