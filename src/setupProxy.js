const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/klayswapQuick',
    createProxyMiddleware({
      target: 'https://3xfqfa63j5.execute-api.ap-northeast-2.amazonaws.com',
      changeOrigin: true,
    })
  );
};