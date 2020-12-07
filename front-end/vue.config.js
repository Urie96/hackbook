const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  productionSourceMap: false,
  configureWebpack: (config) => {
    const cfg = {};
    if (process.env.NODE_ENV === 'production') {
      cfg.plugins = [
        new CompressionPlugin({
          test: /\.(js|css)$/,
          threshold: 1024 * 10,
          // deleteOriginalAssets: true,
        }),
      ];
    }
    cfg.externals = {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
      axios: 'axios',
    };
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
