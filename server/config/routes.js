var controllers = require('../controllers');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.send('HELLO');
    res.end();
  });

  var auth = controllers.users.authenticate;

  app.post('/api/register', controllers.users.signUp);
  app.post('/api/authenticate', controllers.users.authenticate);
  app.post('/api/updatelocation', controllers.auth.authenticate, controllers.tracker.updateLocation);
  app.post('/api/getnearest', controllers.auth.authenticate, controllers.tracker.getNearbyUsers);
};