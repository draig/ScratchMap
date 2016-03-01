var express = require('express');
var http = require('http');
var path = require('path');
var baucis = require('baucis');

var mongoose = require('mongoose');


// start mongoose
mongoose.connect('mongodb://127.0.0.1:27017/scratch_map');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {

    /* test schema */
    var testSchema = new mongoose.Schema({
        user_id: String,
        map_id: String,
        deleted: Boolean
    });

    var Test = mongoose.model( 'sm_user_map', testSchema );

    /* set Baucis */
    baucis.rest('sm_user_map');

    var app = express();

    /*app.configure(function(){
        app.set('port', 3000);
        app.set('view engine', 'handlebars');
        app.set('views', __dirname + '../app/scripts/views');
    });*/

    app.use('/api/v1', baucis());

    // simple log
    app.use(function(req, res, next){
        console.log('%s %s', req.method, req.url);
        next();
    });

    // route index.html
    app.get('/', function(req, res){
        res.sendfile( path.join( __dirname, '../app/index.html' ) );
    });

    // start server
    http.createServer(app).listen(3000, function(){
        console.log('Express App started!');
    });
});




/*
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
*/
