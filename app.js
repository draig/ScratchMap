var express = require('express');
var http = require('http');
var path = require('path');
var baucis = require('baucis');

var mongoose = require('mongoose');

var bodyParser  = require('body-parser');
var morgan      = require('morgan');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User   = require('./app/model/user'); // get our mongoose model

var index = require('./routes/index');
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

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(express.static(path.join(__dirname, 'public')));

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));


    app.use('/', index);

    app.use('/api/v1', baucis());

    // simple log
    app.use(function(req, res, next){
        console.log('%s %s', req.method, req.url);
        next();
    });

    // route index.html
    /*app.get('/', function(req, res){
        res.sendfile( path.join( __dirname, '../app/index.html' ) );
    });*/

    app.get('/setup', function(req, res) {

        // create a sample user
        var nick = new User({
            name: 'Nick Cerminara',
            password: 'password',
            admin: true
        });

        // save the sample user
        nick.save(function(err) {
            if (err) throw err;

            console.log('User saved successfully');
            res.json({ success: true });
        });
    });

    // API ROUTES -------------------

    // get an instance of the router for api routes
    var apiRoutes = express.Router();

    // route to authenticate a user (POST http://localhost:8080/api/authenticate)
    apiRoutes.post('/authenticate', function(req, res) {

        // find the user
        User.findOne({
            name: req.body.name
        }, function(err, user) {

            if (err){
                throw err;
            }

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {

                // check if password matches
                if (user.password != req.body.password) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, app.get('superSecret') || 'ilovescotchyscotch', {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }

            }

        });
    });

    //route middleware to verify a token
    apiRoutes.use(function(req, res, next) {

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret') || 'ilovescotchyscotch', function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    });

    // route to show a random message (GET http://localhost:8080/api/)
    apiRoutes.get('/', function(req, res) {
        res.json({ message: 'Welcome to the coolest API on earth!' });
    });

    // route to return all users (GET http://localhost:8080/api/users)
    apiRoutes.get('/users', function(req, res) {
        User.find({}, function(err, users) {
            res.json(users);
        });
    });


    // apply the routes to our application with the prefix /api
    app.use('/api', apiRoutes);

    // start server
    http.createServer(app).listen(3000, function(){
        console.log('Express App started!');
    });
});
