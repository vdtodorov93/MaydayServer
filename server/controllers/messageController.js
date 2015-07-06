var User = require('mongoose').model('User'),
  Message = require('mongoose').model('Message');

var EQUATORIAL_RADIUS = 3963.2 * 1.604;

module.exports = {
  sendMessage: function(req, res, next) {
    var message = req.body.message,
      username = req.body.username;
    console.log(username);
    User.findOne({ username: username }).exec(function(err, user) {
      if(err) {
        console.log(err);
        res.status(404);
        res.send(err);
        res.end();
      } else {
        var messageModel = new Message();
        console.log(user);
        messageModel.user = user._id;
        messageModel.message = message;
        messageModel.date = new Date();
        Message.create(messageModel, function(err, dbMessage) {
          if(err) {
            console.log(err);
            res.status(404);
            return res.send(err);
          } else {
            console.log('Message registered: ' + dbMessage.message);
          }

          res.end();
        })
      }
    })
  },
  getLastMessages: function(req, res, next) {
    var username = req.body.username,
      dist = req.body.distance,
      hours = req.body.hours;
    console.log('HOURS: ' + hours);
    User.findOne({username: username}, function(err, user) {
      if(err) {
        console.log('error getLastMessages');
        res.send(err);
        res.end();
      } else {
        var query = User.where('geo').within({center: [user.geo[0], user.geo[1]], radius: dist / EQUATORIAL_RADIUS, spherical: true });

        query.exec(function(err, users) {
          if(err) {
            res.send(err);
            console.log(err);
            res.end();
          } else {
            var messages = [],
              maxDate = new Date();
            maxDate.setHours((new Date()).getHours() - hours);
            var userIds = [];
            for(var i = 0; i < users.length; i+=1) {
              userIds.push(users[i]._id);
            }
            Message.where({user: {$in: userIds }, date: {$gte: maxDate }}).exec(function(err, messages) {
              if(err) {
                res.send(err);
                cosnole.log(err);
                res.end();
              } else {
                res.send(messages);
                res.end();
              }
            })
          }
        })
      }
    });
  }
};