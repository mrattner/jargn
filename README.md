# Jargn
Adam Daehling, Marcy Rattner, Kira Revere

## Installation Instructions
1) Download zipfiles of app folder
2) Decompress it
3) Go inside the folder, and type in  
```sh
$ node app.js
```  
Then open up [http://localhost:3000/](localhost:3000).

If you get any module errors, try  
```sh
$ npm cache clean
$ npm install
```  
(For mac users, if you get permission denied errors, do)  
```sh
$ sudo npm (command lines above)
```
This will change your local setup.

## Project Assignment 05
changes:

- database.js -- started to implement database with sequelize

- files: all files in lib altered

- new: lib/database.js

- new folder: 'data'

## Project Assignment 04
list of changes:

- post.js functionality changed

- sockets implemented on posting functionality(posts.js, post.js, post view)

- edited header for views to include jquery and socket.io

- implemented ajax on follow feature

## Project Assignment 03

list of files and additions made:

- app.js started to add websockets functionality

- routes/post.js added beginnings of private post functionality

- lib/posts.js added more functions related to data access layer and started to add websockets functionality

- header.ejs updated to show currently logged in user at top of each page (dynamically)

- users.js added ability to signup as new user

- login.js added support for sessions

- signup.js

- user.js added route for basic format user page

- user.ejs page now shows information about user

- fixed ability to follow other users

- added private posting functionality (works similar to messaging) in database.js

- link to function spec: https://docs.google.com/document/d/1OGut-Hkqo6CMNmCKHnUFP9hGTVM5AO__MUfixOFu34Y/edit?usp=sharing

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
