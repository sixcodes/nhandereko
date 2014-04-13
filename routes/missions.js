module.exports = function(app){
    app.get('/mission/fire', function(req,res) {
        res.render('webapp/prova/fogo')
    });

    app.get('/mission/earth', function(req, res){
        res.render('webapp/prova/terra')
    });

    app.get('/missions/', function(req, res){
        res.render('webapp/prova/missions')
    });
};
