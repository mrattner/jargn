// # Post module
// Allows user to compose and upload a text post.

// The posts library
var postlib = require('../lib/posts');

// ### *function*: display
// provides a user post view
// @param req {object} the HTTP request
// @param res {object} the HTTP response
function display (req, res) {
	res.render('post', {	title	:  'Jargn : Compose Post',
							user	: req.session.user});
}
exports.display = display;

// ### *function*: upload
// Stores a post by the currently logged in user in the posts database.
// @param req {object} the HTTP request
// @param res {object} the HTTP response
function upload (req, res) {
	//Pull the author's username from the request
	var author = req.session.user.username;
	//Pull the text from the post request
	var postText = req.body.post_text;
	//Is this post private?
	var isPrivate = (req.body.private) ? true : false;
	
	//Add the post to the posts database
	postlib.addPost(postText, author, isPrivate);
	
	//Redirect to home page
	res.redirect('/');
}
exports.upload = upload;