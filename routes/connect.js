/**
 *  Connect module: Displays interactions and mentions (tweets that are part of
 *	conversations you are having)
 */

// ### *function*: display
// Provides a connect view.
exports.display = function (req, res) {
	res.render('connect', { title	: 'Jargn : Connect',
							user	: req.session.user});
};