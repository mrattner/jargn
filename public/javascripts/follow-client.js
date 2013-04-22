// # follow.client.js
// Updates the client to show recent follow activity without requiring
// page reloads.

// A FollowClient object for communicating with the server.
function FollowClient(config) {
	for (var prop in config) {
		this[prop] = config[prop];
	}
}

FollowClient.prototype = {
	// A cache of follow activity received from server.
	follows : [],
	
	// Start polling the server.
	poll : function () {
		var that = this;
		this._stop = setInterval(function () {
								 //that.check();
								 },
								 3000);
	},
	
	// Stop polling this server.
	pollStop : function () {
		clearInterval(this._stop);
	},
	
	// Post follow activity to the server.
	follow : function (followed) {
		$.ajax({
		   type : 'POST',
		   url  : '/user/:username/follow',
		   data : {'followed' : followed},
		   dataType : 'json'
		   }).done(function (data) {
				   console.log('Post status: ' + data.status);
		   });
	},
	
//	// Check for more messages on the server given the last index we have for
//	// thecurrent posts.
//	check : function () {
//		var that = this;		
//		$.ajax({
//		   type : 'POST',
//		   url  : '/check',
//		   data : { last : that.posts.length },
//		   dataType : 'json'
//		   }).done(function (data) {
//			   console.log('Check rcvd: ' + JSON.stringify(data));
//			   
//			   // Append the posts to the current posts:
//			   that.posts = that.posts.concat(data);
//			   
//			   // Rewrite to the view:
//			   that.view.empty();
//			   for (var i = 0; i < that.posts.length; i++) {
//				var li   = $('<li>');
//				var date = new Date(that.posts[i].date);
//				li.html(date.toDateString() + ': ' + that.posts[i].text);
//				that.view.append(li);
//			   }
//			});
//	}	
//};

// jQuery ready handler:
$(document).ready(function () {
				  console.log("The document is ready");
  // Get the list view that the chat client
  // will populate with incoming messages:	
  var followc = new FollowClient({ view : $('ol#followers') });
  
  // Start polling:
  // followc.poll();
  
  // Bind a click event:
  $('#followB').click(function (event) {
					  console.log("button clicked");
		followc.follow(this.attr('profileUser'));
		//Bypass default page reload	
		return false;
  });
});