// # User Library
// Library for accessing the database of Jargn users.

// ## User Objects
// These will be replaced with database entries
function User(username, password, name, email) {
	this.username = username;
	this.password = password;
	this.name = name;
	this.email = email;
	this.date = new Date();
}

// ## User Database
// A simple array `users` to record user data.
// Note: This will be replaced with calls to a database layer.
var users = new Array();

// ## Online Users
// An array of usernames who are online
var online = new Array();

// ### *function*: createUser
/**
 * Creates a User object and adds it to the "database," if a user with the same
 * username or same email address doesn't already exist. Invokes callback `cb`
 * with the signature cb(error, message).
 *
 * @param {string} username The username to add
 * @param {string} password The password to associate with this account
 * @param {string} pconfirm String to match against desired password
 * @param {string} email The email address of this account
 * @param {string} name The user's full name
 * @cb Callback function to invoke after attempting to add user
 */
function createUser (username, password, pconfirm, email, name, cb) {
	if (username && password && pconfirm && email && name) {
		//Check for duplicate user
		for (var i=0; i<users.length; i++) {
			var u = users[i];
			//If the username already exists
			if (u.username === username) {
				cb('Please choose a different username', undefined);
				return;
			}
			//If the email address already exists
			if (u.email === email) {
				cb('User ' + u.username + ' already registered with this ' +
				   'email address', undefined);
				return;
			}
		}
		//Check that password and pconfirm match
		if (password === pconfirm) {
			var newUser = new User(username, password, name, email);
			addUser(newUser);
			cb(undefined, 'Successfully created new user ' + username);
		}
		else {
			cb('Passwords must match', undefined);
		}
	}
	else {
		cb('Please fill in all fields', undefined);
	}
}
exports.createUser = createUser;

// ### *function*: authUser
/**
 * Locates a user by `username` if user exists and password matches. Invokes
 * callback `cb` with the signature cb(error, userobj).
 *	@param username {string} The username to authenticate
 *	@param password {string} The password for authentication
 *  @param cb {function} Callback function to invoke after looking up user
 */
function authUser (username, password, cb) {
    for (var i=0; i<users.length; i++) {
		var u = users[i];
		//If the username is found
		if (u.username === username) {
			//Check password
			if (u.password === password) {
				//Successful login
				cb(undefined, u);
			}
			else {
				cb('Incorrect password', undefined);
			}
			return;
		}
	}
	cb('Invalid username', undefined);
}
exports.authUser = authUser;


// ### *function*: getUserByName
/**
 * Walks through the users "database," and return the user object
 * that matches the passed-in name, or undifined if the user is not found
 *
 * @param username {string} The username to search
 * @param cb {function} Callback function to return username
 */
function getUserByName (username, cb) {
	for (var i = 0; i < users.length; i++) {
		if (users[i].username === username) {
			cb(undefined, 'Successfully found the user ' + username);
			return;
		}
	}
	cb('No Data Found', undefined);
}
exports.getUserByName = getUserByName;


// ### *function*: loginUser
/**
 * Adds a user to the list of online users.
 * @param user {object} The user to add to list of logged in users
 */
function loginUser (user) {
	online.push(user.username);
}
exports.loginUser = loginUser;

// ### *function*: logoutUser
/**
 *	Deletes a user from the list of online users, if it is in the list.
 *	@param user {object} The user to delete from list of logged in users
 */
function logoutUser (user) {
	if (online.indexOf(user) != -1) {
		delete online[online.indexOf(user)];
	}
}
exports.logoutUser = logoutUser;

// ### *function*: isLoggedIn
/**
 *	Tells whether a user is in the list of logged in users.
 *	@param {object} user The user to check
 */
function isLoggedIn (user) {
	return (user !== undefined && online.indexOf(user.username) != -1);
}
exports.isLoggedIn = isLoggedIn;

// ### *function*: addUser
/**
 * Adds a user to the database. The `userData` is an object with
 * the following properties:
 *
 * - `username` The user's Jargn handle (@somebody)
 * - `password` The user's password
 * - `name` The user's full name
 * - `email` The user's email address
 * - `date` When the account was created
 *
 * @param {object} newUser The user object to add to the database
 */
function addUser (newUser) {
    users.push(newUser);
}