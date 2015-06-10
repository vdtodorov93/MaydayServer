var controllers = require('../controllers');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.send('HELLO');
  });

  app.get('/api/register', controllers.users.signUp);
  app.get('/api/authenticate', controllers.users.authenticate);
};