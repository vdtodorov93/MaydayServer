// this is e temporate solution for the authentication. We must make it more civilized.
var User = require('mongoose').model('User');

module.exports = {
  authenticate: function (req, res, next) {
    var username = req.body.username,
      password = req.body.password;

    User.findOne({ username: username }).exec(function(err, dbUser) {
      if (err) {
        console.log('Error: ' + err);
        res.end();
      }
      if(dbUser) {
        var isAuth = dbUser.authenticate(password);
        if(isAuth) {
          next();
        } else {
          res.status(403);
          res.end();
        }
      } else {
        res.status(403);
        res.end();
      }
    });
  }
};