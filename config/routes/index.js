var self   = {}, 
    routes = {};

routes.webapp   = require('./webapp');
routes.missions = require('./api/missions');
routes.users    = require('./api/users');


console.log(routes)

self.setup = function(app) {

  app.get('/', routes.webapp.index)
  app.post("/contact/?"  , routes.webapp.contact.create)

  app.namespace('/api', function() {    
    app.namespace('/missions' , function() {
      app.get('/'             , routes.missions.index)
      app.get('/search/?'     ,  routes.missions.search)
    });

    app.namespace('/users', function() {
      app.get("/:id/?", routes.users.show)
    })
  })
}

module.exports = self;