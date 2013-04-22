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
								 that.check();
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
	
	// Check for more activity on the server given the last index we have for
	// the current follow activity.
	check : function () {
		console.log("check was invoked");
		var profileUser = $('#followB').attr('profileUser');
		var that = this;		
		$.ajax({
		   type : 'POST',
		   url  : '/check',
		   data : { username : profileUser },
		   dataType : 'json'
		   }).done(function (data) {
			   console.log('Check rcvd: ' + JSON.stringify(data));
			   
			   // Append the new follow activity:
			   //that.follows = that.follows.concat(data);
			   
			   // Rewrite to the view:
			   that.view.empty();
			   for (var i = 0; i < data.length; i++) {
				var li = $('<li>');
				li.html(data[i]);
				that.view.append(li);
			   }
			});
	}	
};

// jQuery ready handler:
$(function () {
  // Get the list view that the chat client
  // will populate with incoming messages:	
  var followc = new FollowClient({ view : $('ol#followers') });
  
  // Start polling:
  followc.poll();
  
  // Bind a click event:
  $('#followB').bind('click', function () {
		followc.follow($('#followB').attr('profileUser'));
		//Bypass default page reload	
		return false;
  });
});