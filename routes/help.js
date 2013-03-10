/**
 *  Help module: displays help topics and FAQ.
 */
exports.display = function (req, res) {
	res.render('help', { title: 'Jargn: Help' });
}