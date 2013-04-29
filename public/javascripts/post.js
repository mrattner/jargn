// ### *function:* publisher
// Sets up a publisher
// @return obj {object} The object that subscribers subscribe to events on
function publisher () {
	// The subscribers object
	var subscribers = {};
	// The object that subscribers subscribe to events on
	var obj = {};

	// ### *function:* subscribe
	// @param type {string} The type of event to subscribe to
	// @param fn {function} The function to call when the event occurs
	obj.subscribe = function (type, fn) {
		// If there are no subscribers who subscribe to this event, create an
		// empty list for them
		if (subscribers[type] === undefined) {
			subscribers[type] = [];
		}
		subscribers[type].push(fn);
	};

	// ### *function:* unsubscribe
	// @param type {string} The type of event to unsubscribe from
	// @param fn {function} The function to remove
	// @return true if unsubscribe was successful, false otherwise
	obj.unsubscribe = function (type, fn) {
		if (subscribers[type] === undefined){
			return false;
		}
		var s = subscribers[type];
		for(var i = 0; i < s.length; i++) {
			if(s[i] === fn) {
				delete s[i];
				return true;
			}
		}
		return false;
	};

	// ### *function:* publish
	// Publish to all subscribers on respective kind of event.
	// @param type {string} The type of event to publish on
	// @param arg The argument to pass to the subscriber function
	obj.publish = function (type, arg) {
		if(subscribers[type] === undefined){
			return false;
		}

		//invokes subscriber functions
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

// ### *function:* postTextArea
// Gives a manipulable object connected to the post text area in the view.
// @return obj {object} An object representing the postTextArea, which is the 
// text area in the view that the user inputs text into.
function postTextArea () {
	// An object that will represent the postTextArea
	var obj = Object.create(publisher());
	
	// Select the post text area
	obj.elm = $('#post-text-area');

	obj.getText = function () {
		return obj.elm.val();
	};

	obj.clearText = function () {
		obj.elm.val('');
	};
	return obj;
}

//button defined in posts view
function postPostButton () {
	var obj = Object.create(publisher());
	obj.elm = $('#post-post-button');

	//handles click event
	obj.elm.click(function(event){
		console.log('submit button pressed.');
		//publish this to subscribers:
		obj.publish('submit');
		//circumvent page reload
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


