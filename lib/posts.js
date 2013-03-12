// # Posts Library
// Library for accessing the database of posts aka tweets

// ## Post Objects
// fake data to be replaced with database entries

function Post(postText){
	this.postText = postText;
	this.date = new Date();
}

// ## "Post Database"
// array of post data for a given user

var posts = [];

// ### *function*: addPost
/**
	* @param {string} text inside post
	*/

exports.addPost = function (text){
	var newPost = new Post(text);
	users.push(newPost);
}



