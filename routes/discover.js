/**
 *  Discover module: displays popular activity, suggestions for new people to
 *	follow, and allows user to import contacts from other sites/email.
 */

exports.display = function (req, res) {
	res.render('discover', {	title	: 'Jargn : Discover',
								user	: req.session.user});
}