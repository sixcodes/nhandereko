module.exports = function(app){
    app.get('/profile/:username', function(req,res) {
    	res.render('webapp/profile');
    });

    app.get('/signup', function(req,res) {
    	res.render('webapp/signup');
    });

};