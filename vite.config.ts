import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
 
export default defineConfig(() => {
  return {
    plugins: [vue()],
    base: "/yun_web/",
    build: {
      outDir: 'dist'
    },
  }
})