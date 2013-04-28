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
  storage: './jargn.db',
  
  //Disable inserting undefined values as NULL
  omitNull: true
});

sequelize.drop();

// ## User Table
// Schema describing the database of users
var User = sequelize.define('User', {
	username: {
		type: Sequelize.STRING
		, unique: true
		, primaryKey: true
		, validate: {
			is: ["[_a-zA-Z][_a-zA-Z0-9]*", 'i']
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
			isAlpha: true
			, notEmpty: true
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
		, validate: {
			len: [1,140]
		}
	}
	, isPrivate: {
		type: Sequelize.BOOLEAN
		, allowNull: false
		, defaultValue: false
	}
});

// ## Follow Table
// Schema defining the database of follow activity
var Follow = sequelize.define('Follow', {});

// Set the associations
User.hasMany(Post, {as: 'author'});
User.hasMany(Follow, {as: 'follower'});
User.hasMany(Follow, {as: 'followed'});
Post.belongsTo(User);

// Create the tables
sequelize.sync();

exports.Post = Post;
exports.Follow = Follow;
exports.User = User;