const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  baseUrl: isProduction ? '/themes/develop/' : '/',
  outputDir: 'develop',
  productionSourceMap: false,
  devServer: {
    proxy: 'http://192.168.1.216'
  }
}
