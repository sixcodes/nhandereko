var Middlewares = (function() {
  'use strict'

  var extend = require('extend')

  var generateFlashMessage = function(flash) {
    var message = ''
    if(flash) {
      Object.keys(flash).forEach(function(key) {
        message += "<div class='alert alert-" + key + "'><button type='button' class='close' data-dismiss='alert'>×</button><span>&nbsp;&nbsp;" + flash[key] + "</span></div>";
      })
    }
    return message;
  }
  return {
    setup: function(app) {
      
      // Auth
      // only logged users can access admin
      app.use('/api', function(req,res,next) {
        res.locals.host = [req.protocol , "://" , req.headers.host].join('')
        next();
      });
      
      // CSFR Token generation
      app.use(function(req, res, next){
        if(req.xhr) {
          console.log('Skipping CRSF Token generation cuz request is XHR');
        } else {
          res.locals.csrf_token = req.csrfToken();
        }
        next();
      })

      // flash messages
      app.use(function (req, res, next) {
          var flash = req.session.flash;
          // clearing session messages
          req.session.flash = undefined;
          res.locals.session_message = generateFlashMessage(flash);
          next();
      });
    }
  }
})()

module.exports = Middlewares;