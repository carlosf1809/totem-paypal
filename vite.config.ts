import { defineConfig } from 'vite'
import react      from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // troque totem-paypal pelo nome do seu repositório
  base: '/',
})