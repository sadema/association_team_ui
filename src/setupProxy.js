const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/teams-api/',createProxyMiddleware( { target: 'http://localhost:9876/', changeOrigin: true, pathRewrite: {'^/teams-api': ''}}));
    app.use('/querydb/teams/', createProxyMiddleware({ target: 'http://localhost:5984/', pathRewrite: {'^/querydb': ''}}));
}
