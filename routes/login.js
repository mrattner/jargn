// # Login module
/**
 * Allow user to log in, authenticating the user and and starting a session.
 */

// The user database
var userlib = require('../lib/users');

// ### *function*: display
/**
 * Renders the login page.
 *
 * @param {object} req The HTTP request
 * @param {object} res The HTTP response
 */
exports.display = function (req, res) {
	//Grab any messages being sent to use from redirect
	var authmessage = req.flash('auth') || '';
	res.render('login', {	title	: 'Jargn : Login',
							user	: req.session.user,
							message	: authmessage});
};

// ### *function*: auth
/**
 * Performs basic user authentication.
 *	
 * @param {object} req The HTTP request
 * @param {object} res The HTTP response
 */
exports.auth = function (req, res) {
	//Pull the values from the login form
	var username = req.body.username;
	var password = req.body.password;
		
	//Attempt to authenticate the user
	userlib.authUser(username, password, function (error, user) {
		if (error) {
			//If there was an error, flash a message to the redirected route
			req.flash('auth', error);
			res.redirect('/login');
		}
		else {
			//Store the user in the request's session
			req.session.user = user;
			//Store the user in the list of online users
			userlib.loginUser(user);
			//Redirect to index
			res.redirect('/');
		}
	});
};

// ### *function*: logout
/**
 * Deletes user info and session, then redirects to login.
 *
 * @param {object} req The HTTP request
 * @param {object} res The HTTP response
 */
exports.logout = function (req, res) {
	var user = req.session.user;
	
	//Delete user from list of logged in users
	userlib.logoutUser(user);
	
	//Delete user from request's session
	delete req.session.user;
	
	//Redirect to login
	res.redirect('/login');
};