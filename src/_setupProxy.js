const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  console.log('http-proxy-middleware', '=================');
  app.use(proxy('/easy-mock', {
    target: 'https://www.easy-mock.com',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/easy-mock': '/mock/5bf3ee63f0beab552d8b6fef'
    },
  }));

  app.use(proxy('/laboratory', {
    target: 'https://www.easy-mock.com',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/laboratory': '/mock/5bf3ee63f0beab552d8b6fef'
    },
  }));
};