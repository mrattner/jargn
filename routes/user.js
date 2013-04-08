// # User Profile Module
// Represents a user of Jargn. Collects one person's posts, and shows
// information about this person, who is following him/her, and other users
// he/she is following.

// Access the user database
var userlib = require('../lib/users');
// Access the post database
var postlib = require('../lib/posts');

//The user object whose profile this is
var profileUser;

// ### *function*: display
// Renders the user's profile.
exports.display = function (req, res){
	//Get the user whose profile this is
	userlib.getUserByName(req.params.username, function (err, theUser) {
		if (err) {
			res.send('User not found', 404);
		}
		else {
			profileUser = theUser;
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
			postlib.getPostsByUser(theUser, function (err, arr) {
				if (!err) {
					posts = arr;
				}
			});
			res.render('user', { title		: 'Jargn',
								 otherUser  : theUser,
								 user		: req.session.user,
	 							 ouFollowers: followers,
	 							 ouFollowing: following,
	 							 ouPosts	: posts,
								 isFollowing: userlib.isFollowing});
		}
	});
};

// ### *function*: followUser
// Adds the currently logged in user as a follower of this user's profile,
// and adds this user to the currently logged in user's follow list.
// @param req {object} The HTTP request
// @param res {object} The HTTP response
exports.followUser = function (req, res) {
	console.log('started calling function');
	//The currently logged in user
	userlib.getUserByName(req.session.user.username, function (error, currUser) {
		if (error) {
			console.log('404 error');
			res.send("The currently logged in user couldn't be found", 404);
		} else {
			console.log('check if profileUser is currUser');
			//Current user cannot follow himself
			if (profileUser !== currUser) {
				console.log('trying to get currUser to follow profileUser');
				userlib.follow(currUser, profileUser);
				res.send('followed ' + profileUser.username, 200);
			}
			else{
				res.send("you can't follow yourself!", 500);
			}
		}
	});
};