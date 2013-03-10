/*
 *  Tweet module: gets a composed tweet and puts it in the user's personal tweet
 *	database.
 */
exports.display = function (req, res) {
	res.render('tweet', { title: 'Jargn: Compose Tweet' });
}

/**
 *	Uploads a composed tweet to the database.
 */
exports.upload = function (response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You've sent: " + postData);
  response.end();
}