var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

//when deployed in cloud, this will be set to 'production'. On local it is 'development'.
var env = process.env.NODE_ENV || 'development';

configs = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://localhost:27017/mayday',
    port: process.env.PORT || 3000,
    env: env
  },
  production: {
    rootPath: rootPath,
    //TODO: Make mongolab db and add connection string.
    db: 'mongodb://',
    port: process.env.PORT || 3000,
    env: env
  }
};
module.exports = configs[env];