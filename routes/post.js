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
		//Store the post in the database
		postlib.addPost(data.text, data.author, data.isPrivate);
		
		//Broadcast the post back to the client
		socket.broadcast.emit('post', data);
	});
}
exports.init = init;