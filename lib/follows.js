// # Follows Library
// Library for accessing the database of follow activity.

// Access to the database tables
var db = require('./database.js');

// ### *function*: getFollowers  
/**
 * Retrieves the list of all users following the passed user.
 *
 * @param {string} uname The username whose followers to fetch
 * @param {function} cb Callback function to invoke after retrieving followers
 */
exports.getFollowers = function (uname, cb) {
	// Get the user whose followers to fetch
	db.User.find({
		where: { username : uname }
	}).success(function (user) {
		if (user) {
			// Fetch this user's followers
			user.getFollowers().success(function (followers) {
				if (followers) {
					cb(undefined, followers);
				}
				else {
					cb('Could not get followers for ' + uname);
				}
			});
		}
		else {
			cb('Could not find user ' + uname);
		}
	});
};

// ### *function*: getFollowing  
/**
 * Retrieves the list of all users whom the passed user follows.
 *
 * @param {string} uname The user whose subscriptions to fetch
 * @param {function} cb Callback function to invoke after retrieving
 * subscriptions
 */
exports.getFollowing = function (uname, cb) {
	// Get the user whose subscriptions to fetch
	db.User.find({
		where: { username : uname }
	}).success(function (user) {
		if (user) {
			// Fetch the users followed by this user
			user.getFollowings().success(function (followings) {
				if (followings) {
					cb(undefined, followings);
				}
				else {
					cb('Could not get followings for ' + uname);
				}
			});
		}
		else {
			cb('Could not find user ' + uname);
		}
	});
};

// ### *function*: follow  
/**
 * Makes user1 follow user2, if not already following user2.  
 * 
 * @param {string} user1 The username who is following user2  
 * @param {string} user2 The username being followed by user1
 */
exports.follow = function (user1, user2) {
	// Attempt to find this follow activity in the database
	for (var i=0; i<follows.length; i++) {
		if (follows[i].follower === user1 && follows[i].followed === user2) {
			//Do nothing if this follow activity exists already
			console.log(user1 + ' is already following ' + user2);
			return;
		}
	}
	
	follows.push(new FollowActivity(user1, user2));
	console.log(user1 + ' is now following ' + user2);
	console.log(follows);
};

// ### *function*: unfollow  
/**
 * Makes user1 no longer follow user2 if user1 was following user2.  
 *
 * @param {string} user1 The username who is following user2  
 * @param {string} user2 The username who was being followed by user1
 */
exports.unfollow = function (user1, user2) {
	// Attempt to find this follow activity in the database
	for (var i=0; i<follows.length; i++) {
		if (follows[i].follower === user1 && follows[i].followed === user2) {
			//Remove the follow activity from this index
			follows.splice(i, 1);
			console.log(user1 + ' has unfollowed ' + user2);
		}
	}
	console.log('Nonexistent follow activity');
};

// ### *function*: isFollowing
/**
 * Tells whether user1 is following user2.
 *
 * @param {string} user1 The username who may be following user2
 * @param {string} user2 The username who may be followed by user1
 * @return {boolean} true if user1 is following user2
 */
exports.isFollowing = function (user1, user2) {
	//Find user1 in the database
	db.User.find({
		where: { username : user1 }
	}).success(function (follower) {
		if (follower) {
			// Find user2 in the database
			db.User.find({
				where: { username : user2 }
			}).success(function (followed) {
				if (followed) {
					return false;
				}
				else {
					cb('Could not find user ' + user2);
				}
			});
		}
		else {
			cb('Could not find user ' + user1);
		}
	});
};
