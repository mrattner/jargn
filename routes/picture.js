
/*
 * Upload picture in PNG for a default.
 */

 exports.index = function(req, res){
 	res.render('index', { title: 'Express' });
 };
 var server = require("./server");
 var router = require("./router");
 var requestHandlers = require("./requestHandlers");

 var handle = {}
 handle["/"] = requestHandlers.start;
 handle["/start"] = requestHandlers.start;
 handle["/upload"] = requestHandlers.upload;
 handle["/show"] = requestHandlers.show;

 server.start(router.route, handle);
