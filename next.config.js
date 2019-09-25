const withTypescript = require('@zeit/next-typescript')
const withLess = require('@zeit/next-less')
const themeVariables = require('./script/theme')
const IgnorePlugin = require('webpack/lib/IgnorePlugin')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {}
}
let isDev = process.env.NODE_ENV !== 'production'

//相关全局配置
const config = {
  title: '钱趣多-趣赚钱-趣生活',
  description:
    '钱趣多（www.qianquduo.com）让理财成为一种乐趣，100元起投，0手续费，随存随取，项目来自国企应收账款，大型保理公司100%本息保障。钱趣多-让理财成为一种乐趣！',
  keyword:
    '活期理财、互联网金融平台、P2P理财、互联网理财、网上理财、网络理财、网络投资、债权投资、国企应收账款',
  version: 'pc/v201903',
  appid: 'tQIjvsmoG13irECNh5XB6Dl7NZUtvU5K',
  apipath: '/gateway'
}
//相关全局配置

let nextConfig = withTypescript(
  withLess({
    publicRuntimeConfig: { ...config },
    lessLoaderOptions: {
      compress: !isDev,
      javascriptEnabled: true,
      modifyVars: themeVariables,
      sourceMap: isDev
    },
    webpack: (config, options) => {
      config.plugins.push(new IgnorePlugin(/^\.\/locale$/, /moment$/))
      // config.plugins.push(new BundleAnalyzerPlugin())
      config.module.rules.push({
        test: /\.(jpe?g|png|gif|bmp)$/,
        loader: 'url-loader',
        include: path.resolve('./assets'),
        options: {
          limit: 512,
          publicPath: '../images',
          outputPath: './static/images',
          name: `[name]-[hash].[ext]`
        }
      })
      config.module.rules.push({
        test: /\.(eot|ttf|svg|woff)$/,
        include: path.resolve('./assets'),
        loader: 'url-loader',
        options: {
          name: `[name]-[hash].[ext]`,
          outputPath: './static/fonts',
          publicPath: '../fonts',
          limit: 512
        }
      })
      if (!options.dev && !options.isServer) {
        config.optimization.splitChunks.cacheGroups.commons.minChunks = 5
      }

      //polyfills
      const originalEntry = config.entry
      config.entry = async () => {
        const entries = await originalEntry()
        if (
          entries['main.js'] &&
          !entries['main.js'].includes('./script/polyfills.js')
        ) {
          entries['main.js'].unshift('./script/polyfills.js')
        }

        return entries
      }

      return config
    }
  })
)

module.exports = nextConfig
