// # Search
/**
 *  Displays a list of search results.
 */

// ### *function*: display
/**
 * Renders the search results page.
 *
 * @param {object} req The HTTP request  
 * @param {object} res The HTTP response
 */
exports.display = function (req, res) {
	res.render('search', {	title	: 'Jargn : Search Results',
							user	: req.session.user});
};
