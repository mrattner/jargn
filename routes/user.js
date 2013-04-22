// # User Profile Module
// Represents a user of Jargn. Collects one person's posts, and shows
// information about this person, who is following him/her, and other users
// he/she is following.

// Access the user database
var userlib = require('../lib/users');
// Access the post database
var postlib = require('../lib/posts');
// Access the follows database
var followlib = require('../lib/follows');

// ### *function*: display
// Renders the user's profile.
exports.display = function (req, res) {
	//Get the user whose profile this is
	userlib.getUser(req.params.username, function (err, theUser) {
		if (err) {
			res.send('User not found', 404);
		}
		else {
		  var profileUsername = req.params.username;
		  
		  //Get this user's followers
			var followers;
			followlib.getFollowers(profileUsername, function (err, array){
				if (!err){
					followers = array;
				}
			});
		  
		  //Get who is following this user
			var following;
			followlib.getFollowing(profileUsername, function (err, array){
				if (!err){
					following = array;
				}
			});
		  
		  //Get this user's posts
			var posts;
			postlib.getPostsByUser(profileUsername, function (err, array) {
				if (!err) {
					posts = array;
				}
			});
			
		  //Is this the currently logged in user's profile?
		  var myProfile = (profileUsername === req.session.user.username);
		
		  //Is the currently logged in user following this user?
		  var isAFollower = followlib.isFollowing(req.session.user.username, 
												profileUsername);
		 //Page title
		  var pageTitle = 'Jargn : ' + profileUsername;
		  
		  //Render the view
		  res.render('user', { 
			 title: pageTitle,
			 profileUser: profileUsername,
			 user: req.session.user,
			 profileFollowers: followers,
			 profileFollowing: following,
			 profilePosts: posts,
			 isMyProfile: myProfile,
			 isFollowing: isAFollower});
		}
	});
};

// ### *function*: followAction
// Adds the currently logged in user as a follower of this user's profile,
// and adds this user to the currently logged in user's follow list.
// @param req {object} The HTTP request
// @param res {object} The HTTP response
exports.followAction = function (req, res) {
	//The currently logged in user's name
	var follower = req.session.user.username;
	var followed = req.body.followed;
	
	if (follower === followed) {
		res.send("you can't follow yourself!", 500);
	}
	else {
		//If current user is already following profile user, this is an unfollow
		if (followlib.isFollowing(follower, followed)) {
			followlib.unfollow(follower, followed);
		}
		else {
			followlib.follow(follower, followed);
		}
		// Send status
		res.json({status: 'OK'});
	}
};

// ### *function*: check
// Sends the client new follow activity in JSON format.
exports.check = function (req, res) {
	var activity = followlib.getFollowers(req.body.username, 
		function (err, followers) {
			if (!err){
				res.json(followers);
			}
		});
};