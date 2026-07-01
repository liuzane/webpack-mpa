// Webpack
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

// 开发配置
const config = require('./webpack.start.config.js');

// devServer 配置
const options = {
  contentBase: './dist',
  // hot: true, // 开始热模块（不会自动刷新浏览器）
  host: 'localhost',
  open: true,
  // hotOnly: false,
  progress: true, //构建进度
  port: 3000,
  // info: false,
  clientLogLevel: 'none',
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(options.port, options.host, () => {
  console.log('dev server listening on port ' + options.port);
});