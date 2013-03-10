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
, user = require('./routes/user');

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
			  
			  
			  
			  app.use(express.bodyParser());
			  app.use(express.methodOverride());
			  app.use(express.cookieParser('your secret here'));
			  app.use(express.session());
			  app.use(app.router);
			  app.use(express.static(path.join(__dirname, 'public')));
			  });

/**
 *	Configure Express in development mode.
 */
app.configure('development', function(){
			  app.use(express.errorHandler());
			  app.use(express.logger('dev'));
			  });

/**
 *	Index (home) route
 */
app.get('/', routes.index);
app.get('/connect', connect.display);
app.get('/discover', discover.display);
app.get('/help', help.display);
app.get('/myprofile', myprofile.display);
app.get('/search', search.display);
app.get('/settings', settings.display);
app.get('/tweet', tweet.display);

app.listen(APP_PORT);