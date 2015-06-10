var mongoose = require('mongoose'),
  encryption = require('../utils/encryption');

var userSchema = mongoose.Schema({
  username: { type: String, required: '{PATH} is required', unique: true },
  email: { type: String, required: '{PATH} is required' },
  salt: String,
  hashedPass: String,
  lastLocationUpdate: { type: Date }

  //TODO: Add coordinates
});

userSchema.methods.authenticate = function(password) {
  var isPasswordCorrect = this.hashedPass === encryption.generateHashedPassword(this.salt, password);
  console.log(this.username + ' with correct password: ' + isPasswordCorrect);
  return isPasswordCorrect;
};

var User = mongoose.model('User', userSchema);

module.exports.seed = function() {
  User.find({}).exec(function (err, collection) {
    if(err) {
      console.log('Cannot find users: ' + err);
    }

    if(collection.length === 0) {
      var salt = encryption.generateSalt();
      var pass = encryption.generateHashedPassword(salt, 'test');
      User.create({ username: 'test', email: 'test@test.test', salt: salt, hashedPass: pass });
      console.log('Added user test');
    }
  })
};