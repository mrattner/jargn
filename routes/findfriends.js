// # Find Friends
/**
 * Plugs into email and social media APIs to retrieve contacts; fetches list of
 * people you may know based on whom you already follow.
 */

// ### *function*: display
/**
 * Renders the Find Friends page.
 *
 * @param {object} req The HTTP request
 * @param {object} res The HTTP response
 */
exports.display = function (req, res) {
	var getUserMessage = req.flash('findfriends') || '';
	res.render('findfriends', { title	: 'Jargn : Find Friends',
								user	: req.session.user,
								message : getUserMessage});
};
