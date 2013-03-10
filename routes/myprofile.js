/**
 *  My Profile module: Represents the current user's profile, including tweets
 *	and retweets, list of followers, list of followed users, favorited tweets,
 *	lists, and requests.
 */
exports.display = function (req, res) {
	res.render('myprofile', { title: 'Jargn: Your Profile' });
}