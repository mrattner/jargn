// # Signup module
/** The database will search whether there is a duplicated user stored or not.
 *	If not, submit button will put a new user in the database.
 */

//The user database
var userlib = require('../lib/users');

//Function to decide if redirect is necessary
var loggedIn = require('./login').loggedIn;

// ### *function*: display
// Shows the sign up page, with a message from a previous signup attempt.
// If a user is already logged in, redirects to index.
exports.display = function (req, res) {
	if (loggedIn(req)) {
		res.redirect('/');
	}
	else {
		var authmessage = req.flash('auth') || '';
		res.render('signup', {	title	: 'Jargn: Sign Up',
								message	: authmessage,
								user	: req.session.user});
	}
}

// ### *function*: auth
// Authenticates account creation.
exports.auth = function (req, res) {
	//If the user is already logged in, redirect to index
	if (loggedIn(req)) {
		res.redirect('/');
	}
	else {
		//Pull the values from the signup form
		var username = req.body.username;
		var password = req.body.password;
		var pconfirm = req.body.pconfirm;
		var email = req.body.email;
		var name = req.body.name;
		
		//Attempt to create new user
		userlib.createUser(username, password, pconfirm, email, name,
						   function (error, message) {
			if (error) {
				//If there was an error, flash a message to the redirected
				//route `signup`.
				req.flash('auth', error);
				res.redirect('/signup');
			}
			else {
				req.flash('auth', message);
				//Redirect to login
				res.redirect('/login');
				}
			});
	}
};