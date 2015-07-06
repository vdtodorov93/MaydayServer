var User = require('mongoose').model('User');

var EQUATORIAL_RADIUS = 3963.2 * 1.604;

module.exports = {
  updateLocation: function (req, res, next) {
    var user = req.body.username,
      lat = req.body.lat,
      long = req.body.long,
      query = {'username': user};
    User.update(query, {$set: {lastLocationUpdate: new Date(), geo: [long, lat]}}, function(err, doc) {
      if(err) {
        res.status(404);
        res.send(err);
        console.log('could not update: ' + user + ' lat: ' + lat + ' long: ' + long);
      } else {
        res.send({success: true});
        console.log('SUCCESS UPDATE: ' + user + ' lat: ' + lat + ' long: ' + long);
      }
      res.end();
    })
  },
  getNearbyUsers: function (req, res, next) {
    var user = req.body.username,
      dist = req.body.dist;
    console.log(dist);
    User.findOne({username: user}, function(err, user) {
      if(err) {
        console.log('error getNearbyUsers');
        //res.status(403);
        res.send(err);
        res.end();
      } else {
        var query = User.where('geo').within({center: [user.geo[0], user.geo[1]], radius: dist / EQUATORIAL_RADIUS, spherical: true });

        query.exec(function(err, users) {
        if(err) {
          res.send(err);
          console.log(err);
        } else {
          res.send(mapToDtos(users));
        }
        res.end();
      })
      }
    });
    //var query = User.findOne({'geo': })
  }
};

function mapToDtos(users) {
  var result = [];
  console.log('USERS');
  console.log(users);
  console.log('END USERS');
  users.forEach(function(user) {
    var userDto = {};
    console.dir(user);
    userDto._id = user._id;
    userDto.username = user.username;
    userDto.email = user.email;
    userDto.lastLocationUpdate = user.lastLocationUpdate;
    userDto.geo = user.geo;

    result.push(userDto);
  });
  return result;
}