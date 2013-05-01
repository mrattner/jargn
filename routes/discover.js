// # Discover
/**
 * Displays popular activity, suggestions for new people to follow, and allows
 * user to import contacts from other sites/email.
 */

// ### *function*: display
/**
 * Renders the Discover page.
 *
 * @param {object} req The HTTP request
 * @param {object} res The HTTP response
 */
exports.display = function (req, res) {
	res.render('discover', {	title	: 'Jargn : Discover',
								user	: req.session.user});
};
