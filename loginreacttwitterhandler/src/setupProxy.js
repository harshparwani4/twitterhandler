const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('statuses', { target: 'https://api.twitter.com/1.1/' }));

  app.use(proxy('/users', { target: 'http://localhost:5000' }));
};