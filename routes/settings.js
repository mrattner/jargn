/**
 *  Settings module: Allows user to change profile, information, and user info,
 *	and create widgets for external use.
 */
exports.display = function (req, res) {
	res.render('settings', {	title	: 'Jargn : Settings',
								user	: req.session.user});
}

