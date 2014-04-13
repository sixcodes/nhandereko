module.exports = function(app){
    app.get('/prova/fogo', function(req,res) {
        res.render('webapp/prova/fogo')
    });

    app.get('/mission/earth', function(req, res){
        res.render('webapp/prova/terra')
    });
};
