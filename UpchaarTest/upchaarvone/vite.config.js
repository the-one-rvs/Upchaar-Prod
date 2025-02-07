import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const link = process.env.VITE_BACKEND_LINK || 'http://localhost:3030'

console.log("Backend link: ", link); // Log the link to console

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: link,
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
  plugins: [react()],
})