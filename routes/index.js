/*
 * Home module: displays newest tweets from people you are following.
 */

// ### *function*: index
// Provides a user index view
exports.index = function(req, res){
  res.render('index', { title	: 'Jargn',
						user	: req.session.user});
};