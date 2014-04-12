(function() {
  "use strict";

  var express   = require('express'),
    mongoose    = require('mongoose'),
    path        = require('path');
    
  global.app = express();

  express.application = app; /* hack for express-namespace */
  require('express-namespace');

  app.rootDir    = __dirname
  app.rootAppDir = __dirname + '/app/';
  app.modelsPath = path.join(app.rootAppDir , 'models');

  var routes     = require('./config/routes');
  var config     = require('./config')

  config.setup(app, express);
  config.setupDatabase(mongoose);

  routes.setup(app);

  var port = process.env.PORT || 3000;

  app.listen(port);

  console.log('Express server listening on port =' + port);

  module.exports = exports = app;

})();