const path = require('path');

module.exports = {
  publicPath: './',
  assetsDir: 'server',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '^/server/': {
        target: 'http://localhost:3000/',
        changeOrigin: true
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/styles/app.scss')]
    }
  }
};
