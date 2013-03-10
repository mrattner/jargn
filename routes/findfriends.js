/**
 *  Find friends module: plugs into email and social media APIs to retrieve contacts; fetches list of people you may
 *  know based on whom you already follow
 */
exports.display = function (req, res) {
	res.render('findfriends', { title: 'Jargn: Find Friends' });
}

/**
 *	Searches for people by username or full name.
 */
function search (name) {
	
}