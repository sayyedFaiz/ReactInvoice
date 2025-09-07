import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['9wyrca-ip-46-223-148-61.tunnelmole.net'],
    host: true,
    port: 5173,
  }
})
