module.exports = {
  updateLocation: function (req, res, next) {
    console.log('update: ' + req.body.values);
    res.send({ success: true });
    res.end();
  },
  getNearbyUsers: function (req, res, next) {

  }
};