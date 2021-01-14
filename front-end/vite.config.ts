import path = require('path');
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:7122',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
