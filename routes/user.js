
/*
 * GET users listing.
 */

// Access the user database
var userlib = require('../lib/users');
// Access the post database
var postlib = require('../lib/posts');

// ### *function*: list
// Gets user's listing.
  exports.list = function(req, res){
  res.send("respond with a resource");
};

// ### *function*: display
// Renders the user's profile.
exports.display = function(req, res){
	var other = req.params.username;
	console.log(other);
	userlib.getUserByName(other, function (err, theUser){
		if(err){
			res.send('User not found', 404);
		}
		else{
			var followers;
			userlib.getFollowers(theUser, function(err, arr){
				if(err){}
				else{
					followers = arr;
				}
			});
			var following;
			userlib.getFollowers(theUser, function(err, arr){
				if(err){}
				else{
					following = arr;
				}
			});
			var posts;
			postlib.getPostsByUser(theUser, function(err, arr){
				if(err){}
				else{
					posts = arr;
				}
			});
			res.render('user', { title		: 'Jargn',
								 otherUser  : theUser,
								 user		: req.session.user,
	 							 ouFollowers: followers,
	 							 ouFollowing: following,
	 							 ouPosts	: posts});
		}
	});
};