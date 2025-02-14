const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',  // Set publicPath to '/' to serve from the root of the deployed project
  outputDir: 'dist',  // Make sure the build output is placed correctly in `log-dashboard/dist/`
  configureWebpack: {
    resolve: {
      alias: {
        'chart.js': 'chart.js/dist/chart.min.js',
      }
    }
  }
});
