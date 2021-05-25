const isProduction = process.env.NODE_ENV === 'production';
const { IgnorePlugin } = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const configureWebpack = {
  plugins: [
    // Ignore all locale files of moment.js
    new IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};

if (isProduction) {
  configureWebpack.plugins.push(
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      // 匹配文件名
      test: /\.js$|\.html$|\.css/,
      // 对超过10k的数据压缩
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

module.exports = {
  configureWebpack,
  publicPath: process.env.NODE_ENV === 'production'
      ? '/dist/'
      : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: true,
  devServer: {
    disableHostCheck: true,
    // history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
    // historyApiFallback: {
    //   index: '/index.html' //与output的publicPath
    // },
    proxy: {
      '/api': {
        // 接口的域名
        target: 'http://42.192.209.104/crm/api',
        // target: 'http://192.168.8.240:4000',
        ws: true,
        // 如果接口跨域，需要进行这个参数配置
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
