const path = require('path');

module.exports = {
  devServer: {
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
