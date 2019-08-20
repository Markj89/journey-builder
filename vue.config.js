const path = require('path');

module.exports = {
  publicPath: './',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '^/api/': {
        target: 'http://localhost:8080/',
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
