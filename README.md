# Jargn
Adam Daehling, Marcy Rattner, Kira Revere

## Installation Instructions

To run the app, you must have [Node](http://www.nodejs.org) installed on your machine, which comes with npm (Node Package 
Manager).

1.	Download .zip file of app folder
2.	Decompress it
3.	Navigate inside the folder through your console, and run the command  
	`$ npm install` 
4.	Wait for all Node modules to finish installing, and when the prompt appears again, run  
	`$ node app.js` 
5.	Navigate to [http://localhost:3000/](http://localhost:3000/) in any Web browser to use the app.  
If you get any module errors, try running:  
	`$ npm cache clean  
	$ npm install`  
If permission is denied when attempting to run Node, you may need to run it as an administrator.

## Project Assignment 05

- new file: lib/database.js Set up table schema and associations with Sequelize
- files: all files in lib altered to make database calls instead of JavaScript array manipulations
- new folder: 'data' containing 326.sqlite database

Known issues:

- Functions to add entries to tables have not been written yet
- Functions to find entries in tables have not been written yet

## Project Assignment 04

- WebSockets implemented for submitting new posts (route, client-side, Compose Post view)
- new file: public/javascripts/post.js added client-side support for socket.io
- app.js, routes/post.js: added server-side support for socket.io
- new file: public/javascripts/follow-client.js Client-side code for JQuery Ajax feature (following and unfollowing)
- used JQuery Ajax to update views when users follow or unfollow each other
- edited header for views to include JQuery and new client-side JavaScript files

Known issues:

- the lists of followers and following is not populated when the page initially loads (only after Ajax polls the server)
- following or unfollowing a user does not always update the view without a page reload
- possible error on the server when unfollowing a user
- The feed on the homepage is not populated with posts by you and people you follow
- Post privacy is not taken into account when displaying posts

## Project Assignment 03

- app.js Added middleware for authentication
- header.ejs updated to show currently logged in user at top of each page
- lib/users.js added ability to signup as new user
- login.js added support for sessions
- signup.js creates a new account through data access layer
- routes/user.js added route for basic format user page
- views/user.ejs page now shows information about user
- added capability for 'private' posts on an individual basis (New feature not implemented by Twitter)
- created files in lib/ folder (data access layer) and wrote functions to access fake database

## Project Assignment 02

- created GitHub repository
- structured app into routes, views, and data access layer
- wrote app.js to initialize Express app and run it on the server

## Project Assignment 01
- [Functional specification](https://docs.google.com/document/d/1OGut-Hkqo6CMNmCKHnUFP9hGTVM5AO__MUfixOFu34Y/edit?usp=sharing)

## Features

### Signup
A user who is not logged in may only see the Signup and Login pages. The Signup page allows a user to sign up for an
account by entering the following information:

* Username
* Password
* Confirm Password
* Email Address
* Full name

The database will check whether another user with the same username or email address already exists, and whether the
Password and Confirm Password fields match, creating a new account upon success.

### Login
To log in to the app with an existing account, enter

* Username
* Password

Once the user is authenticated, any page of the app is accessible except for Login and Signup. To log out again, click
the Logout link on any page.

### Home
Shows a feed of posts by yourself and everyone you are following. The posts are limited to those that you have permission
to see. This is updated live whenever new posts are composed, without requiring a page reload.

### Post
When you are logged in, you can compose a post and have it appear on your profile and homepage feed. You can choose to
make a post private when you compose it, so that it is only visible to you, and to people with whom you have a mutual
follow relationship (you follow them and they follow you).

### User Profile
Every user has his own profile, which shows all of his followers and all the users he is following, all of his posts,
and other information about the user. If you navigate to your own profile, you can see your followers and the users
you follow, and all of your posts. If you navigate to other users' profiles, you can click a button to follow them.
Your name will then appear on the list of their followers, and their names will appear on your profile's "Following"
list. The lists of followers and following will update in all views without a page reload. You can click the same
button on someone's profile to un-follow that user.
