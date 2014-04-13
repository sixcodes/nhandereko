module.exports = function(app){
    app.get('/', function (req, res) {
        res.render('webapp/prova/fogo');
    });
};

module.exports = function(app){
    app.get('/prova/fogo', function(req,res) {
        res.render('webapp/prova/fogo')
    });
};
