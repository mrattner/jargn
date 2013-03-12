/**
 *  Search module: Collect list of search results
 */


// ### *function*: display
// Provides a user searched results.
exports.display = function (req, res) {
	res.render('search', {	title	: 'Jargn : Search Results',
							user	: req.session.user});
}