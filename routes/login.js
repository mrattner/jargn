/**
 *	Login module: Allow user to log in and start session.
 */

//The user database
var userlib = require('../lib/users');

// ### *function*: display
// Provides a user login view. If user is already logged in, redirects to index.
exports.display = function (req, res) {
	if (loggedIn(req)) {
		res.redirect('/');
	}
	else {
		//Grab any messages being sent to use from redirect
		var authmessage = req.flash('auth') || '';
		res.render('login', {	title	: 'Jargn : Login',
								user	: req.session.user,
								message	: authmessage});
	}
};

// ### *function*: auth
// Performs basic user authentication.
function auth (req, res) {
	if (loggedIn(req)) {
		res.redirect('/');
	}
	else {
		//Pull the values from the login form
		var username = req.body.username;
		var password = req.body.password;
		
		//Attempt to authenticate the user
		userlib.authUser(username, password, function (error, user) {
			if (error) {
				//If there was an error, flash a message to the redirected
				//route `login`.
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
	}
}
exports.auth = auth;

// ### *function*: loggedIn
/**
 *	Checks to see that the request's user is logged in.
 *	@param {object} req The HTTP request
 *	@return true if the request's current user exists and is logged in
 */
function loggedIn (req) {
	//Get the user from the request's session if it exists
	var user = req.session.user;
	//Return true if the user is logged in
	return userlib.isLoggedIn(user);
}
exports.loggedIn = loggedIn;

// ### *function*: logout
/**
 *	Deletes user info and session, then redirects to login.
 *	@param user The user to log out
 */
function logout (req, res) {
	var user = req.session.user;
	
	//If already logged out, redirect to login
	if (!loggedIn(req)) {
		req.flash('auth', 'Already logged out');
		res.redirect('/login');
		return;
	}
	//Delete user from list of logged in users
	userlib.logoutUser(user);
	
	//Delete user from request's session
	delete req.session.user;
	
	//Redirect to login
	res.redirect('/login');
}
exports.logout = logout;