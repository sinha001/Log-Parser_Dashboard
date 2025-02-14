const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        'chart.js': 'chart.js/dist/chart.min.js', // Ensure using the minified browser version of chart.js
      }
    }
  }
});
