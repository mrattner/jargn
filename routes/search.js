/**
 *  Search module: Collect list of search results
 */
exports.display = function (req, res) {
	res.render('search', {	title	: 'Jargn : Search Results',
							user	: req.session.user});
}