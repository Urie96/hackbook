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
      '/linguo': {
        target: 'https://linguomm.xyz',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/linguo/, ''),
      },
      '/graphql': {
        target: 'http://localhost:4000',
      },
    },
  },
});
