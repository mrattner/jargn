// # Post module: gets a composed post and adds to user's list of tweets

// ### *function*: display
/**
	*	provides a user post view
	*
	*	@param {object} req the HTTP request
	*	@param {object} res the HTTP response
	*/
exports.display = function (req, res) {
	res.render('post, {	title	:  'Jargn : Compose Post',	user	: req.session.user});
}

// ## *function*: upload
/**
	* stores tweet
	* @param {object} res the HTTP response
	* @param {object} postData the text from the post
	*/

exports.upload = function (res, postData) {
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("You've sent: " + postData);
	response.end();
}
