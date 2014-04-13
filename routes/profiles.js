module.exports = function(app){
    app.get('/me', function(req,res) {
    	res.render('webapp/me');
    });

    app.get('/profile/:profile', function(req,res) {
    	res.render('webapp/profile');
    });

    app.get('/signup', function(req,res) {
    	res.render('webapp/signup');
    });

};
