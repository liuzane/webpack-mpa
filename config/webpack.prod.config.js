// Node 环境变量
process.env.NODE_ENV = 'production';

// Webpack
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 变量
const processEnv = require('./env.js');

// 配置
const webpackBaseConfig = require('./webpack.base.config.js');

module.exports = merge(webpackBaseConfig, {
  plugins: [
    // 清空输出文件夹
    new CleanWebpackPlugin(),

    // 拷贝 public 文件夹中的文件到输出文件夹
    new CopyWebpackPlugin({
      patterns: [
        { from: processEnv.STATIC_URL }
      ],
    }),
  ]
});