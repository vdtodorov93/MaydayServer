var controllers = require('../controllers');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.send('HELLO');
  });

  app.post('/api/register', controllers.users.signUp);
  app.post('/api/authenticate', controllers.users.authenticate);
  app.post('/api/updatelocation', controllers.auth.authenticate, controllers.tracker.updateLocation);
};