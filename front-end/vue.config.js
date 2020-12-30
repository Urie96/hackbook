const CompressionPlugin = require('compression-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin')

/** @type {import('@vue/cli-service').ProjectOptions} */
module.exports = {
  productionSourceMap: false,
  chainWebpack: (config) => {
    // config.plugins.delete('prefetch').delete('preload');
  },
  configureWebpack: (config) => {
    /** @type {import('webpack').Configuration} */
    const cfg = {
      externalsType: 'script',
      externals: [{
        'highlight.js': ['https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@10.4.1/highlight.min.js', 'hljs'],
        'katex': ['https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js', 'katex'],
        'katex/contrib/auto-render/auto-render.js': ['https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.min.js', 'renderMathInElement'],
        'video.js': ['https://cdn.jsdelivr.net/npm/video.js@7.10.2/dist/video.min.js', 'videojs'],
      }]
    }
    if (process.env.NODE_ENV === 'production') {
      cfg.plugins = [
        new CompressionPlugin({
          test: /\.(js|css|html|svg)$/,
          threshold: 1024 * 10,
          // deleteOriginalAssets: true,
        }),
        new GenerateSW({
          // mode: 'development',
          clientsClaim: true,
          skipWaiting: true,
          exclude: [/\.gz$/],
          runtimeCaching: [
            {
              urlPattern: /https:\/\/(img-cdn|cdn|static001\.geekbang\.org|s0\.lgstatic\.com)/,
              handler: 'CacheFirst',
              options: {
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /https?:\/\/[^/]+\/api\/(?!login)(?!userservice)/,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheableResponse: {
                  statuses: [200]
                }
              }
            }
          ]
        }),
        new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)(),
      ];
    }
    return cfg
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    https: false,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:7122',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
      '/linguo': {
        target: 'https://linguomm.xyz',
        changeOrigin: true,
        pathRewrite: {
          '^/linguo': '',
        },
      },
    },
  },
};
