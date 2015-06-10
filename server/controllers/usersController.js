var User = require('mongoose').model('User'),
  encryption = require('../utils/encryption');

module.exports = {
  authenticate: function(req, res, next) {
    //TODO: Implement this
  },
  signUp: function(req, res, next) {
    console.log('Registering user: ' + req.body.username);
    var username = req.body.username,
      password = req.body.password,
      repeatPassword = req.body.repeatPassword;
    if(password !== repeatPassword || !password || password.length === 0) {
      res.send({ success: false, error: 'Password not correct' });
      res.end();
      return;
    }

    User.findOne({ username: username }).exec(function(err, user) {
      if(err) {
        res.send({ success: false, error: err.toString() });
        res.end();
        console.log('user ' + username + ' already exists');
      } else if(!user) {
        console.log('creating new user');
        var newUserData = {
          username: username,
          email: req.body.email
        };

        newUserData.salt = encryption.generateSalt();
        newUserData.hashedPass = encryption.generateHashedPassword(newUserData.salt, password);

        User.create(newUserData, function(err, dbUser) {
          if(err) {
            console.log('Failed to register new user: ' + err);
            res.status(400);
            return res.send( {success: false, error: err.toString() });
          }
          console.log('DBuser: ' + dbUser);
        })
      } else {
        console.log('User already exists');
        res.send({ success: false, error: 'User already registered' });
        res.end();
      }
    })
  }
};