// # Post module
// Allows user to compose and upload a text post.

// The posts library
var postlib = require('../lib/posts');

// ### *function*: display
// Renders the view for Compose Post.
// @param req {object} the HTTP request
// @param res {object} the HTTP response
function display (req, res) {
	res.render('post', {	title	:  'Jargn : Compose Post',
							user	: req.session.user});
}
exports.display = display;

// ### *function*: init
// Server-side support for Websockets. Broadcasts data to the socket.
// @param socket {object} The socket.io object
function init (socket) {
	socket.on('post', function (data) {
	  console.log('Received post: ' + JSON.stringify(data));
	  socket.broadcast.emit('post', data);
	  });
}
exports.init = init;

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
	
	// Send status
	res.json({status: 'OK'});
}
exports.upload = upload;