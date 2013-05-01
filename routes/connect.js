// # Connect
/**
 * Displays interactions and mentions (posts that are part of conversations
 * you are having).
 */

// ### *function*: display
/**
 * Renders the Connect page.
 * 
 * @param {object} req The HTTP request
 * @param {object} res The HTTP response
 */
exports.display = function (req, res) {
	res.render('connect', { title	: 'Jargn : Connect',
							user	: req.session.user});
};