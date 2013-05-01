// # Index/Home Module
// Displays a feed of posts by yourself and users you are following, and allows
// you to create new posts.

// The posts library
var postlib = require('../lib/posts');

// ### *function*: display
// Renders the index view.  
// @param req {object} The HTTP request  
// @param res {object} The HTTP response
function display (req, res) {
  res.render('index', { title	: 'Jargn : Home',
						user	: req.session.user});
}
exports.display = display;

// ### *function*: init
// Server-side support for Websockets. Broadcasts data to the socket.  
// @param socket {object} The socket.io object
function initPost (socket) {
	socket.on('post', function (data) {
		console.log('Received post: ' + JSON.stringify(data));
		//Store the post in the database
		postlib.addPost(data.text, data.author, data.isPrivate);
		
		//Broadcast the post back to the client
		socket.broadcast.emit('post', data);
	});
}
exports.initPost = initPost;