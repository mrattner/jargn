// # Help
/**
 *  Displays help topics, documentation, and FAQ.
 */

// ### *function*: display
/**
 * Renders the Help page.
 *
 * @param {object} req The HTTP request
 * @param {object} res The HTTP response
 */
exports.display = function (req, res) {
	res.render('help', {	title	: 'Jargn : Help',
							user	: req.session.user});
};
