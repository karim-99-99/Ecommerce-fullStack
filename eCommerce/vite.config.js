import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vite automatically handles SPA routing in dev mode
  // For production, Django will serve the built files
  build: {
    // Output to Django's static directory for production
    outDir: '../eCommerce1/static/dist',
    emptyOutDir: true,
  },
})
