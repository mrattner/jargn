/**
 *  Profile module: Represents a user's profile, including tweets
 *	and retweets, list of followers, list of followed users, favorited tweets,
 *	lists, and requests.
 *	if it's the current users' profile then it displays as 'my profile'
 *	otherwise it displays as another users respective profile
 */

// post/tweet database
var postlib = require('../lib/posts');
var userlib = require('../lib/users');
var loggedIn = require('./login').loggedIn;

// ### *function*: display
// Provides a view of a user's activity, his tweets,etc.

exports.display = function (req, res) {
	if(loggedIn(req)){
		res.render('profile', {	title	: 'Jargn : Profile' 
														user	: req.session.user});
	}
	else{
		req.flash('auth', message);
		res.redirect('/login');
	}
}


