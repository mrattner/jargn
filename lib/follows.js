// # Follows Library
// Library for accessing the database of follow activity.

// ## Follow Objects
// These will be replaced with database entries.  
// - `follower` {string} The username who is following the followed username  
// - `followed` {string} The username being followed by the following username
function FollowActivity (follower, followed) {
	this.follower = follower;
	this.followed = followed;
}

// ## Follows Database
// A simple array `users` to record user data.  
// Note: This will be replaced with calls to a database layer.
var follows = new Array();

//	### *function*: getFollowers
//	Retrieves the list of all users following the passed user.
//	@param username {string} The username whose followers to fetch
//	@param cb {function} Callback function to invoke after retrieving followers
function getFollowers (username, cb) {
	var followers = new Array();
	//Walk through the array looking for people following this user
	for (var i=0; i<follows.length; i++) {
		if (follows[i].followed === username) {
			followers.push(follows[i].follower);
		}
	}
	if (followers.length === 0) {
		cb(username + ' has no followers');
	} else {
		cb(undefined, followers);
	}
}
exports.getFollowers = getFollowers;

//	### *function*: getFollowing
//	Retrieves the list of all users whom the passed user follows.
//	@param username {string} The user whose subscriptions to fetch
//	@param cb {function} Callback function to invoke after retrieving following
function getFollowing (user, cb) {
	var following = new Array();
	//Walk through the array looking for people this user is following
	for (var i=0; i<follows.length; i++) {
		if (follows[i].follower === username) {
			following.push(follows[i].following);
		}
	}
	if (following.length === 0) {
		cb(username + ' is not following anyone');
	} else {
		cb(undefined, following);
	}
}
exports.getFollowing = getFollowing;

//	### *function*: follow
//	Makes user1 follow user2, if not already following user2.
//	@param user1 {string} The username who is following user2
//	@param user2 {string} The username being followed by user1
function follow (user1, user2) {
	// Attempt to find this follow activity in the database
	for (var i=0; i<follows.length; i++) {
		if (follows[i].follower === user1 && follows[i].followed === user2) {
			//Do nothing if this follow activity exists already
			return;
		}
	}
	
	follows.push(new FollowActivity(user1, user2));
}
exports.follow = follow;

//	### *function*: unfollow
//	Makes user1 no longer follow user2 if user1 was following user2.
//	@param user1 {string} The username who is following user2
//	@param user2 {string} The username who 
function unfollow (user1, user2) {
	// Attempt to find this follow activity in the database
	for (var i=0; i<follows.length; i++) {
		if (follows[i].follower === user1 && follows[i].followed === user2) {
			delete follows[i];
		}
	}
}

// ### *function*: isFollowing
// Tells whether user1 is following user2.
// @param user1 {string} The username who may be following user2
// @param user2 {string} The username who may be followed by user1
// @return true if user1 is following user2
function isFollowing (user1, user2) {
	for (var i=0; i<follows.length; i++) {
		if (follows[i].follower === user1 && follows[i].followed === user2) {
			return true;
		}
	}
	return false;
}
exports.isFollowing = isFollowing;