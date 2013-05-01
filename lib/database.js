// # Database
// Functions for setting up and defining the tables in the database.

// Use Sequelize as an object-relational mapper
var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password', {
  // The SQL dialect of the database
  dialect: 'sqlite',

  // Enable logging to console.log
  logging: console.log,

  // The storage engine for our database
  storage: './data/326.sqlite',
  
  //Disable inserting undefined values as NULL
  omitNull: true
});

// ## User Table
// Schema describing the database of users
var User = sequelize.define('User', {
	username: {
		type: Sequelize.STRING
		, unique: true
		, validate: {
			notEmpty: true
		}
	}
	, password: {
		type: Sequelize.STRING
		, validate: {
			notEmpty: true
		}
	}
	, name: {
		type: Sequelize.STRING
		, validate: {
			notEmpty: true
		}
	}
	, email: {
		type: Sequelize.STRING
		, unique: true
		, validate: {
			isEmail: true
		}
	}
});

// ## Post Table
// Schema defining the database of posts
var Post = sequelize.define('Post', {
	text: {
		type: Sequelize.TEXT
	}
	, isPrivate: {
		type: Sequelize.BOOLEAN
		, allowNull: false
		, defaultValue: false
	}
});

// Set the associations
User.hasMany(Post, {foreignKey: 'AuthorId'});
User.hasMany(User, {as: 'Follower', foreignKey: 'FollowedId'});

// Create the tables
sequelize.sync();

exports.Post = Post;
exports.User = User;