/**
 *  Find friends module: plugs into email and social media APIs to retrieve
 *	contacts; fetches list of people you may know based on whom you already
 *	follow
 */

// ### *function*: display
// Provides a user Find Friends view.
exports.display = function (req, res) {
	res.render('findfriends', { title	: 'Jargn : Find Friends',
								user	: req.session.user});
}