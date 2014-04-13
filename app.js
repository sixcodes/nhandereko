
var express = require('express')
    , load = require('express-load')
    , http = require('http')
    , path = require('path')
    , swig = require('swig');

var io = require('socket.io');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set("smtp_user", process.env.SMTP_USER);
app.set("smtp_pass", process.env.SMTP_PASS);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

swig.setDefaults({cache: false});

app.set('layout', 'webapp/layout');

load('models').then('controllers').then('routes').into(app);

if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
var server = http.createServer(app);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
var server_io = io.listen(server);
server_io.sockets.on('status', function (socket) {

});
module.exports = server_io;
module.exports = app;
