module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        'chart.js': 'chart.js/dist/chart.min.js',
      }
    }
  },
  publicPath: '/'  // This is the default for deployments to the root domain
};
