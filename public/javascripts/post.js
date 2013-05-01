// ### *function:* publisher
/**
 * Sets up a publisher.
 *
 * @return {object} The object that subscribers subscribe to events on
 */
function publisher () {
	// The subscribers object
	var subscribers = {};
	// The object that subscribers subscribe to events on
	var obj = {};

	// ### *function:* subscribe
	/**
	 * Subscribe to an event.
	 *
	 * @param {string} type The type of event to subscribe to
	 * @param {function} fn The function to call when the event occurs
	 */
	obj.subscribe = function (type, fn) {
		// If there are no subscribers who subscribe to this event, create an
		// empty list for them
		if (subscribers[type] === undefined) {
			subscribers[type] = [];
		}
		subscribers[type].push(fn);
	};

	// ### *function:* unsubscribe
	/**
	 * Unsubscribe from an event.
	 *
	 * @param {string} type The type of event to unsubscribe from
	 * @param {function} fn The function to remove
	 * @return {boolean} true if unsubscribe was successful, false otherwise
	 */
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
	/**
	 * Publish to all subscribers on respective kind of event.
	 *
	 * @param {string} type The type of event to publish on
	 * @param arg The argument to pass to the subscriber function
	 */
	obj.publish = function (type, arg) {
		if(subscribers[type] === undefined){
			return false;
		}

		// Invoke subscriber functions
		var s = subscribers[type];
		for(var i = 0; i < s.length; i++) {
			var fn = s[i];
			fn(arg);
		}
		return true;
	};
	
	return obj;
}

// ### *function:* postTextArea
/**
 * Gives a manipulable object connected to the post text area in the view.
 *
 * @return {object} An object representing the postTextArea, which is the 
 * text area in the view that the user inputs text into.
 */
function postTextArea () {
	// An object that will represent the postTextArea
	var obj = Object.create(publisher());
	
	// Select the post text area
	obj.elm = $('#post-text-area');

	// Pull the text from the text area
	obj.getText = function () {
		return obj.elm.val();
	};

	// Empty out the text area
	obj.clearText = function () {
		obj.elm.val('');
	};
	return obj;
}

// ### *function:* postPostButton
/**
 * Gives a manipulable object connected to the post button in the view.
 *
 * @return {object} An object representing the postPostButton, which is the 
 * button the user clicks to submit a post.
 */
function postPostButton () {
	var obj = Object.create(publisher());
	obj.elm = $('#post-post-button');

	//handles click event
	obj.elm.click(function(event){
		//publish this to subscribers:
		obj.publish('submit');
		//circumvent page reload
		return false;
	});
	return obj;
}

// ### *function:* postList
/**
 * Gives a manipulable object connected to the post list in the view.
 *
 * @return {object} An object representing the postList, which displays
 * recent posts.
 */
function postList() {
	var obj = Object.create(publisher());
	obj.elm = $('#post-list');

	// A method to add a post to the list:
	obj.addMessage = function (msg) {
		var next = $('<li>');
		next.html(msg);
		obj.elm.prepend(next);
	};

	return obj;
}

// ### *function:* postModule
/**
 * Gives a manipulable object connected to the post text area in the view.  
 *
 * @param {object} socket The socket.io object
 * @return {object} The publisher object representing the post module
 */
function postModule (socket) {
	var obj = Object.create(publisher());
	obj.elm = $('div#post-module');

	// Create each of the important UI objects
	obj.text = postTextArea();
	obj.post = postPostButton();
	obj.list = postList();

	// Subscribe to the submit event on the post button, which will invoke
	// the callback function when the submit event occurs
	obj.post.subscribe('submit', function () { 
		// Get whether the post was private
		var privacy = $('#privacyCheckbox').is(':checked') ? true : false;
		// Get the author of the post
		var postAuthor = $('#currentUser span').text();
		// Grab the textarea's text
		var message = obj.text.getText();
		
		// Send the post back to the server
		socket.emit('post', { 
			text : message
			, author : postAuthor
			, isPrivate : privacy });

		// Clear the text box and add the message locally
		obj.text.clearText();
		var now = new Date();
		obj.list.addMessage(postAuthor + ' (' + now + '):<br />' + message);
	});

  return obj;
}

// This is the chat module to avoid name conflicts
var Post = {};

// jQuery ready handler that will be invoked when the document is ready
$(function () {
	// Connect with WebSockets
	var socket = io.connect();
	// Instantiate a new chat application
	Post.app = postModule(socket);
});
