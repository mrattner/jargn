/*
 * Home module: displays newest tweets from people you are following.
 */
exports.index = function(req, res){
  res.render('index', { title	: 'Jargn',
						user	: req.session.user});
};