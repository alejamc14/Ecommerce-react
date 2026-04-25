import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/Ecommerce-react/" : "/",
  plugins: [
    react(),
    tailwindcss(),
  ],
})


