// # Signup module
/** The database will search whether there is a duplicated user stored or not.
 *	If not, submit button will put a new user in the database.
 */

//The user database
var userlib = require('../lib/users');

// ### *function*: display
/**
 *	Shows the sign up page, with a message from a previous signup attempt.
 *
 *	@param {object} req The HTTP request
 *	@param {object} res The HTTP response
 */
function display (req, res) {
	var authmessage = req.flash('auth') || '';
	res.render('signup', {	title	: 'Jargn: Sign Up',
							message	: authmessage,
							user	: req.session.user});
}
exports.display = display;

// ### *function*: auth
/**
 *	Authenticates account creation.
 *
 *	@param {object} req The HTTP request
 *	@param {object} res The HTTP response
 */
function auth (req, res) {
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
			//route `signup`
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
exports.auth = auth;