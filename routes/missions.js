module.exports = function(app){

	app.get('/mission/:mission', function(req,res) {
		res.render('webapp/prova/' + req.params.mission )
	})
	
    app.get('/missions/', function(req, res){
    	res.locals = req.query;
        res.render('webapp/prova/missions')
    });

    app.get('/finish', function(req,res) {
    	res.render('webapp/finish');
    })
};
