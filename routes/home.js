/*
 *  Home to tweet
 */
var server = require("./server");
var router = require("./router");
var tweet = require("./tweet");

var handle = {}
handle["/"] = tweet.start;
handle["/start"] = tweet.start;
handle["/upload"] = tweet.upload;
handle["/show"] = tweet.show;

server.start(router.route, handle);