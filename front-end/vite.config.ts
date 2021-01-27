import path = require('path');
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';

export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style/index`,
        },
      ],
    }),
  ],
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
  optimizeDeps: {
    exclude: ['@vant/touch-emulator'],
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
