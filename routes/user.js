// # User Profile
/**
 * Represents a user of Jargn. Collects one person's posts, and shows
 * information about this person, who is following him/her, and other users
 * he/she is following.
 */

// Access the user database
var userlib = require('../lib/users');
// Access the post database
var postlib = require('../lib/posts');
// Access the follows database
var followlib = require('../lib/follows');

// Use async.js for asynchronous database calls
var async = require('async');

// ### *function*: display
/**
 * Renders the user profile page.
 *
 * @param {object} req The HTTP request  
 * @param {object} res The HTTP response
 */
exports.display = function (req, res) {
	var profileU = req.params.username;
	var currentU = req.session.user.username;
	var followers, following, posts;
	
	//Get the values of all the above variables
	async.series([
		//Get the user whose profile this is
    	function (callback) {
    		userlib.getUser(profileU, function (err, theUser) {
    			if (err) {
    				res.send('User not found', 404);
    			}
    			else {
    				callback(null);
    			}
    		});
    	},
    	//Get this user's followers
    	function (callback) {
        	followlib.getFollowers(profileU, function (err, array) {
        		if (!err) {
        			followers = array;
        			console.log('Followers null?: '+(followers == null));
        			callback(null);
        		}
        		else {
        			callback('Problem getting followers');
        		}
        	});
    	},
    	//Get who is following this user
    	function (callback) {
    		followlib.getFollowing(profileU, function (err, array) {
    			if (!err) {
    				following = array;
    				console.log('Following null?: '+(following == null));
    				callback(null);
    			}
    			else {
    				callback('Problem getting following');
    			}
    		});
    	},
    	//Get this user's posts
    	function (callback) {
    		postlib.getPostsByUser(currentU, profileU, function (err, array) {
    			if (!err) {
    				posts = array;
    				console.log('Posts null?: '+(posts == null));
    				callback(null);
    			}
    			else {
    				callback('Problem getting posts');
    			}
    		});
    	}
	],
	// Finally, render the page
	function (err, results) {
		if (!err) {
			console.log('After all the asynchronous functions:');
			console.log((followers) +', '+ (following) +', '+ (posts));
			console.log(typeof(followers) + ', ' + typeof(following) + ', '+ typeof(posts));
			for (var thing in followers) {
				console.log('thing in followers: '+thing);
			}
			//Is this the currently logged in user's profile?
			var myProfile = (profileU === currentU);

			//Is the currently logged in user following this user?
			var isAFollower = followlib.isFollowing(currentU, profileU);
		
			//Page title
			var pageTitle = 'Jargn : ' + profileU;

			//Render the view
			res.render('user', { 
				title: pageTitle,
				profileUser: profileU,
				user: req.session.user,
				profileFollowers: followers,
				profileFollowing: following,
				profilePosts: posts,
				isMyProfile: myProfile,
				isFollowing: isAFollower
			});
		}
	});
};

// ### *function*: followAction
/**
 * Adds the currently logged in user as a follower of this user's profile,
 * and adds this user to the currently logged in user's follow list.
 *
 * @param {object} req The HTTP request  
 * @param {object} res The HTTP response
 */
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
/**
 * Sends the client new follow activity in JSON format.
 *
 * @param {object} req The HTTP request  
 * @param {object} res The HTTP response
 */
exports.check = function (req, res) {
	var activity = followlib.getFollowers(req.body.username, 
		function (err, followers) {
			if (!err){
				res.json(followers);
			}
		});
};
