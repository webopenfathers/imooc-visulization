import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': './src',
    },
  },
  server: {
    hmr: true,
    proxy: {
      '/api': {
        target: 'https://api.imooc-web.lgdsunday.club',
        changeOrigin: true,
      },
    },
  },
})
