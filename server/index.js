var express = require('express');

var app = express();

var config = require('./config/config');
require('./config/express')(app, config);
require('./config/mongoose')(config);
require('./config/routes')(app);

app.listen(config.port);
console.log('Mayday up and running on port: ' + config.port);