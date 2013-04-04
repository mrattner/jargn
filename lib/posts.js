// # Posts Library
// Library for accessing the database of posts aka tweets

// ## Post Object
// fake data to be replaced with database entries
function Post(postText, author, isPrivate){
	this.postText = postText;
	this.author = author;
	this.isPrivate = isPrivate;
	this.date = new Date();
}

// ## "Post Database"
// Collection of all posts in jargn.
var posts = new Array();

//	### *function*: addPost
//	Adds a new post to the global collection of posts.
//
//	@param text {string} The 140 or fewer text characters that comprise the post
//	@param author {object} The user who authored the post
//	@param isPrivate {boolean} If true, only users who follow the author should
//		be able to see the post
function addPost (text, author, isPrivate) {
	var newPost = new Post(text, author, isPrivate);
	users.push(newPost);
}
exports.addPost = addPost;


//	### *function*: getPostsByUser
//	Retrieves a list of all posts authored by a certain user.
//
//	@param username	{string} The username of the author for whom to find posts
//	@param cb {function} Callback function to invoke after looking up posts
function getPostsByUser (username, cb) {
	//List of posts found by this user
	var postsList = new Array();
	
	for (var i=0; i<posts.length; i++) {
		var p = posts[i];
		//If the username is found
		if (p.author && p.author.username === username) {
			//Add this post to the list to return
			postsList.push(p);
		}
	}
	
	//If postsList is empty
	if (postsList.length === 0) {
		cb('No posts by user' + username + ' were found', undefined);
	}
	else {
		//Invoke the callback with no error and pass along the list of posts
		cb(undefined, postsList);
	}
}
exports.getPostsByUser = getPostsByUser;