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

Post p1 = new Post('pretend post1');
Post p2 = new Post('pretend post2');
Post p2 = new Post('pretend post3');

var posts = [p1, p2, p3];

// ### *function*: addPost
/**
	* @param {string} text inside post
	*/

exports.addPost = function (text){
	var newPost = new Post(text);
	users.push(newPost);
}



