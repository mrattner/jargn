function publisher(){
	var subscribers = {};
	var obj = {};

	//subscribe to an event:
	obj.subscribe = function (type, fn) {
		if (subscribers[type] == undefined) {
			subscriber[type].push(fn);
		}
	};

	//unsubscribe:
	obj.unsubscribe = function (type, fn){
		if (subscribers[type] == undefined){
			return false;
		}
		var s = subscribers[type];
		var i;
		for(i = 0; i < s.length; i++) {
			if(s[i] === fn) {
				delete s[i];
				return true;
			}
		}
		return false;
	};

	//publish to all subscribers on respective event

	obj.publish = function (type, arg){
		if(subscribers[type] === undefined){
			return false;
		}

		var s = subscribers[type];
		var i;
		for(i = 0; i < s.length; i++) {
			var fn = s[i];
			fn(arg);
		}
		return true;
	};
	return obj;
}

function postTextArea(){
	var obj = Object.create(publisher());
	obj.elm = $('#post-text-area');

	obj.getText = function() {
		return obj.elm.val();
	};

	obj.clearText = function() {
		obj.elm.val('');
	};
	return obj;
}

function postPostButton(){
	var pbj = Object.create(publisher());
	obj.elm = $('#post-post-button');

	//handles click event
	obj.elm.click(function(event){
		console.log('submit button pressed.');
		//publish this to subscribers:
		obj.publish('submit');
		
		return false;
	});
	return obj;
}

// The message list that corresponds with the post list defined in
// the view:
function postList() {
  var obj = Object.create(publisher());
  obj.elm = $('#post-list');

  // A method to add a post to the list:
  obj.addMessage = function (msg) {
    var next = $('<li>');
    next.text(msg);
    obj.elm.prepend(next);
  };

  return obj;
}
function postModule(socket) {
  var obj = Object.create(publisher());
  obj.elm = $('div#post-module');

  // Create each of the important UI objects:
  obj.text = postTextArea();
  obj.post = postPostButton();
  obj.list = postList();

  // We let the post button deal with its own click event.  We simply
  // subscribe to the submit event on the post button.  It will invoke
  // our callback when it is ready to do so:
  obj.post.subscribe('submit', function () {
    // Grab the textarea's text and send to server:
    var message = obj.text.getText();
    socket.emit('post', { post : message });
    // Clear the text box and add the message locally:
    obj.text.clearText();
    obj.list.addMessage(message);
  });

  // Handle incoming post messages from the server:
  socket.on('post', function (data) {
    obj.list.addMessage(data.post);
  });

  return obj;
}

// This is the chat module to avoid name conflicts:
var Post = {};

$(function () {
  // Connect with WebSockets:
  var socket = io.connect();
  // Instantiate a new chat application:
  Post.app = postModule(socket);
});


