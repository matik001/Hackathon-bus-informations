import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    // fast-deep-equal doesnt have default export
    // https://github.com/vitejs/vite/issues/2679
    include: ['@apollo/client/core', '@apollo/client/cache', '@apollo/client/link/context', 'fast-deep-equal'],
    exclude: ['@apollo/react'],
  },
})
