// # Settings
/**
 *  Allows user to change profile, information, and user info.
 */

// ### *function*: display
/**
 * Renders the Settings page.
 *
 * @param {object} req The HTTP request  
 * @param {object} res The HTTP response
 */
exports.display = function (req, res) {
	res.render('settings', {	title	: 'Jargn : Settings',
								user	: req.session.user});
};
