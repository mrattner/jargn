/**
 *	# app
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
, search = require('./routes/search')
, settings = require('./routes/settings')
, signup = require('./routes/signup')
, post = require('./routes/post')
, user = require('./routes/user')
;

// ## app object
// The Express app
var app = express();

/**
 *	### *function*: authmw
 *	Middleware for authentication and redirecting.
 *
 *	@param req {object} The HTTP request
 *	@param res {object} The HTTP response
 *	@param next {function} The next route, as defined by the router
 */
function authmw (req, res, next) {
	//Pattern defining login or signup URLs
	var signupOrLoginURL = /^\/(login|signup)/;
	
	//Pattern defining stylesheet URLs
	var stylesheetURL = /^\/stylesheets/;
	
	//If the user is not logged in
	if (req.session.user === undefined){
		//If a logged out user is trying to log in or sign up
		if (req.url.match(signupOrLoginURL) || req.url.match(stylesheetURL)) {
			//Then continue to next route
			next();
		}
		//Otherwise, redirect to login
		else {
			login.display(req, res, next);
		}
	}
	//Otherwise, the user is logged in
	else {
		//If a logged in user is trying to log in or sign up
		if (req.url.match(signupOrLoginURL)) {
			//Then redirect to index
			routes.index(req, res, next);
		}
		//Otherwise, continue to next route
		else {
			next();
		}
	}
}

/**
 *	Configure Express and use middleware
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
			  
			  //Use the custom authentication middleware for redirecting
			  app.use(authmw);
			  
			  //Use router middleware (must be used after express.session)
			  app.use(app.router);
			  
			  //Serve up static files in the 'public' directory
			  app.use(express.static(path.join(__dirname, '/public')));
});

/**
 *	Configure Express in development mode
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
app.post('/findfriends/getUser', findfriends.getUser);
app.get('/help', help.display);
app.get('/login', login.display);
app.post('/login/auth', login.auth);
app.get('/logout', login.logout);
app.get('/search', search.display);
app.get('/settings', settings.display);
app.get('/signup', signup.display);
app.post('/signup/auth', signup.auth);
app.get('/post', post.display);
app.get('/user/:username', user.display);
app.post('/user/:username/follow', user.followUser);

// Web Sockets/Socket.IO
var io	= require('socket.io', {'log level': 0}).listen(8000);
var posts = require('./lib/posts');

io.sockets.on('connection', function (socket) {
	posts.init(socket);
});

// Listen for HTTP requests
app.listen(APP_PORT);
