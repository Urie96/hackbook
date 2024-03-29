import * as path from "path";
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
      '/graphql': {
        target: 'https://book.lubui.com',
      },
    },
  },
});
