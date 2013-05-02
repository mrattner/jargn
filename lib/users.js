// # User Library
// Library for accessing the database of Jargn users.

// Access to the database tables
var db = require('./database.js');

// ## Online Users
// An array of usernames who are online
var online = new Array();

// ### *function*: createUser
/**
 * Creates a User object and adds it to the database, if a user with the same
 * username or same email address doesn't already exist. Invokes callback `cb`
 * with the signature `cb (error, message)`.
 *
 * @param {string} uname The username to add
 * @param {string} pword The password to associate with this account
 * @param {string} pconfirm String to match against desired password
 * @param {string} mail The email address of this account
 * @param {string} fullname The user's full name
 * @cb Callback function to invoke after attempting to add user
 */
exports.createUser = function (uname, pword, pconfirm, mail, fullname, cb) {
	if (uname && pword && pconfirm && mail && fullname) {
		//Check that password and pconfirm match
		if (pword !== pconfirm) {
			cb('Passwords must match');
		}
		else {
			//Check for duplicate username
			db.User.find({
				where: {username : uname}
			}).success(function (existingUser) {
				if (existingUser) {
					cb('Username ' + uname + ' is taken');
				}
				else {
					//Check for duplicate e-mail
					db.User.find({
						where: {email : mail}
					}).success(function (existingEmail) {
						if (existingEmail) {
							cb(mail + ' already has an associated account');
						}
						else {
							//Create the user
							db.User.create({
								username : uname
								, password : pword
								, name : fullname
								, email : mail
							}).success(function (newUser) {
								//Invoke callback with success message
								cb(undefined, 'Successfully created new user '
									+ uname);
							});
						}
					});
				}
			});
		} 
	}
	else {
		cb('Please fill in all fields');
	}
};

// ### *function*: authUser
/**
 * Locates a user by `username` if user exists and password matches. Invokes
 * callback `cb` with the signature `cb (error, userobj)`.
 *
 * @param {string} uname The username to authenticate
 * @param {string} pword The password for authentication
 * @param {function} cb Callback function to invoke after looking up user
 */
exports.authUser = function (uname, pword, cb) {
    // Find the user in the database
    db.User.find({
    	where: {username : uname}
    }).success(function (user) {
    	if (user) {
    		if (user.password === pword) {
    			//Successful login
    			cb(undefined, user);
    		}
    		else {
    			cb('Incorrect password');
    		}
    	}
    	else {
    		cb('Invalid username');
    	}
    });
};

// ### *function*: getUser
/**
 * Retrieves the user object from the database that matches the passed username
 *
 * @param {string} uname The username to fetch
 * @param {function} cb Callback function to invoke after retrieving user
 */
exports.getUser = function (uname, cb) {
	//Find the user in the database
	db.User.find({
		where: {username : uname}
	}).success(function (user) {
		if (user) {
			//Successfully fetched user
			cb(undefined, user);
		}
		else {
			cb('User ' + username + ' was not found');
		}
	});
};

// ### *function*: loginUser
/**
 * Adds a user to the list of online users.
 *
 * @param {object} user The user to add to list of logged in users
 */
exports.loginUser = function (user) {
	online.push(user.username);
};

// ### *function*: logoutUser
/**
 * Deletes a user from the list of online users, if it is in the list.
 *
 * @param {object} user The user to delete from list of logged in users
 */
exports.logoutUser = function (user) {
	if (online.indexOf(user) != -1) {
		delete online[online.indexOf(user)];
	}
};

// ### *function*: isLoggedIn
/**
 * Tells whether a user is in the list of logged in users.
 *
 * @param {object} user The user to check
 */
exports.isLoggedIn = function (user) {
	return (user !== undefined && online.indexOf(user.username) != -1);
};
