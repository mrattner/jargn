// # Posts Library
// Library for accessing the database of posts aka tweets

// Access to the database tables
var db = require('./database.js');

// ### *function*: addPost
/**
 * Adds a new post to the global collection of posts.
 *
 * @param {string} postText The text characters that comprise the post
 * @param {string} author The user who authored the post
 * @param {boolean} privacy If true, only users who follow the author should
 * be able to see the post
 */
exports.addPost = function (postText, author, privacy) {
	db.Post.create({
		text : postText
		, isPrivate : privacy
	}).success(function (newPost) {
		// Get the author of the post
		db.User.find({ 
			where: {username : author}
		}).success(function (user) {
			if (user) {
				newPost.setUser(user);
				user.addPost(newPost);
			}
		});
	});	
};

// ### *function*: getPostsByUser
/**
 * Retrieves a list of all posts authored by a certain user, and that the
 * currently logged in user is authorized to see.  
 *
 * @param {string} loggedInUser The currently logged in user
 * @param {string} authorName The user whose posts you want to get
 * @param {function} cb Callback function to invoke after looking up posts
 */
exports.getPostsByUser = function (loggedInUser, authorName, cb) {
	//Find the author in the user table
	db.User.find({
		where: {username : authorName}
	}).success(function (author) {
		if (author) {
			authorID = author.id;
			//Fetch this user's posts
			var postFetch = db.Post.findAll({
				where: {UserId : authorID}
			});
			postFetch.success(function (postList) {
				if (postList) {
					//Pass back the list of posts
					cb(undefined, postList);
				}
				else {
					cb(authorName + ' has no posts');
				}
			});
			postFetch.error(function (err) {
				console.log("Halp");
			});
		}
	});
};
