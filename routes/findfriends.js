/**
 *  Find friends module: plugs into email and social media APIs to retrieve
 *	contacts; fetches list of people you may know based on whom you already
 *	follow
 */

//The user database
var userlib = require('../lib/users');

// ### *function*: display
// Provides a user Find Friends view.
exports.display = function (req, res) {
	var getUserMessage = req.flash('findfriends') || '';
	res.render('findfriends', { title	: 'Jargn : Find Friends',
								user	: req.session.user,
								message : getUserMessage});
}

// ### *function*: getUser
/**
 *	Performs basic getUser.
 *	
 *	@param {object} req The HTTP request
 *	@param {object} res The HTTP response
 */
function getUser (req, res) {
	//Pull the value from the input
	var username = req.body.username;
		
	//Attempt to authenticate the user
	userlib.getUserByName(username, function (error, message) {
		if (error) {
			//If there was an error, flash a message to the redirected route 'findfriends'
			req.flash('getUser', error);
			res.redirect('/findfriends');
		}
		else {
			req.flash('getUser', message);
			res.redirect('/findfriends');
		}
		
	});
}
exports.getUser = getUser;