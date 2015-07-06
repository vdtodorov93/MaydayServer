var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  message: { type: String },
  date: { type: Date },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

var Message = mongoose.model('Message', messageSchema);

module.exports = function() {
  Message.find({});
};