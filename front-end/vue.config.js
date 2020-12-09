const CompressionPlugin = require('compression-webpack-plugin');

/** @type {import('@vue/cli-service').ProjectOptions} */
module.exports = {
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.plugins.delete('prefetch').delete('preload');
  },
  configureWebpack: (config) => {
    // console.log(config.plugins[0]);
    // delete confi
    /** @type {import('webpack').Configuration} */
    const cfg = {};
    if (process.env.NODE_ENV === 'production') {
      cfg.plugins = [
        new CompressionPlugin({
          test: /\.(js|css)$/,
          threshold: 1024 * 10,
          // deleteOriginalAssets: true,
        }),
        // new require('webpack-bundle-analyzer').BundleAnalyzerPlugin(),
      ];
    }
    cfg.externals = [
      {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT',
        axios: 'axios',
      },
    ];
    return cfg;
  },
  devServer: {
    host: 'localhost',
    port: 8081,
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
        target: 'http://linguomm.xyz',
        changeOrigin: true,
        pathRewrite: {
          '^/linguo': '',
        },
      },
    },
  },
};
