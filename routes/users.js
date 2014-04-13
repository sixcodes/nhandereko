module.exports = function(app){
    var user = app.controllers.users;
    app.get('/', function(req,res){res.render('webapp/index')});
    app.get('/user', user.getAll);
    app.get('/user/:id', user.getById);
    app.post('/user', user.createUser);
    app.put('/user', user.update);
//    app.delete('/user/:id', user.delete);

};
