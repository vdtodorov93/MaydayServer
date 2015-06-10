var usersController = require('./usersController');

//importing all the controllers won't be needed, just require the 'controllers'
//and use them with controllers.users, controllers.... etc
module.exports = {
  users: usersController
};