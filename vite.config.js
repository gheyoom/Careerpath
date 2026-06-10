import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteWebfontDownload } from 'vite-plugin-webfont-dl'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    ViteWebfontDownload(),
    viteSingleFile()
  ],
  server: {
    host: '0.0.0.0', // Exposes the server on the local network
    port: 5173,
  }
})
