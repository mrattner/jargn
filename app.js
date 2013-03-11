/**
 *	Launching point for the Express app.
 */

//Set the port on which to run the app
var APP_PORT = 3000;

//Module dependencies and routes
var express = require('express')
, routes = require('./routes')
, http = require('http')
, path = require('path')
, flash = require('connect-flash')

, connect = require('./routes/connect')
, discover = require('./routes/discover')
, findfriends = require('./routes/findfriends')
, help = require('./routes/help')
, login = require('./routes/login')
, myprofile = require('./routes/myprofile')
, search = require('./routes/search')
, settings = require('./routes/settings')
, signup = require('./routes/signup')
, tweet = require('./routes/tweet')
, user = require('./routes/user')
;

//Set up the Express app
var app = express();

/**
 *	Configure Express.
 */
app.configure(function(){
			  //Set the correct port to run on
			  app.set('port', process.env.PORT || APP_PORT);
			  
			  //Set the view directory path
			  app.set('views', __dirname + '/views');
			  
			  //Set the default engine extension to use when omitted
			  app.set('view engine', 'ejs');
			  
			  //Parser for the body of HTTP requests
			  app.use(express.bodyParser());
			  
			  //Allows use of DELETE and PUT
			  app.use(express.methodOverride());
			  
			  //Populates req.cookies with an object keyed by the cookie names
			  app.use(express.cookieParser('kittens'));
			  
			  //Use session middleware (must be used after express.cookieParser)
			  app.use(express.session());
			  
			  //Use flash support for sessions
			  app.use(flash());
			  
			  //Use router middleware (must be used after express.session)
			  app.use(app.router);
			  
			  //Serve up static files in the 'public' directory
			  app.use(express.static(path.join(__dirname, '/public')));
});

/**
 *	Configure Express in development mode.
 */
app.configure('development', function(){
			  app.use(express.errorHandler());
			  app.use(express.logger('dev'));
});

/**
 *	Define the routes
 */
app.get('/', routes.index);
app.get('/connect', connect.display);
app.get('/discover', discover.display);
app.get('/findfriends', findfriends.display);
app.get('/help', help.display);
app.get('/login', login.display);
app.post('/login/auth', login.auth);
app.get('/logout', login.logout);
app.get('/myprofile', myprofile.display);
app.get('/search', search.display);
app.get('/settings', settings.display);
app.get('/signup', signup.display);
app.post('/signup/auth', signup.auth);
app.get('/tweet', tweet.display);


app.listen(APP_PORT);