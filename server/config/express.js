var bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan');

module.exports = function(app, config) {
  app.set(logger('dev'));
  app.use(cookieParser());
  app.use(bodyParser());
  app.use(bodyParser.urlencoded({ extended: false }));
};