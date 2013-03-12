/**
 *  Help module: displays help topics and FAQ.
 */


// ### *function*: display
// Provides a user help view.
exports.display = function (req, res) {
	res.render('help', {	title	: 'Jargn : Help',
							user	: req.session.user});
}