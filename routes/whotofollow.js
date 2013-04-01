/**
 *  Who to follow module: displays 4 recommendations of users on Jargn
 *	
 */

// ### *function*: display
// Provides a user who to follow view.
exports.display = function (req, res) {
	res.render('whotofollow', {	title	: 'Jargn : Who to follow',
							user	: req.session.user});
}