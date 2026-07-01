// Node 环境变量
process.env.NODE_ENV = 'start';

// Webpack
const webpack = require('webpack');
const { merge } = require('webpack-merge');

// 配置
const webpackBaseConfig = require('./webpack.base.config.js');


module.exports = merge(webpackBaseConfig, {
  devServer: {
    contentBase: './dist',
    // hot: true,
    host: 'localhost',
    // open: true,
    // hotOnly: false,
    progress: true, //显示打包的进度
    quiet: false, //控制台中不输出打包的信息
    port: 1000,
    // info: false,
    clientLogLevel: 'none',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
});