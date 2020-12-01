const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = {
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()]
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/scss/_variables.scss";
        `
      }
    }
  }
}
