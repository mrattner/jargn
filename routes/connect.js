/**
 *  Connect module: Displays interactions and mentions (tweets that are part of
 *	conversations you are having)
 */

exports.display = function (req, res) {
	res.render('connect', { title: 'Jargn: Connect' });
}