# Member
Adam Daehling, Marcy Rattner, Kira Revere

## Before compiling
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

## Project Assignment 04
list of changes:

-- post.js functionality changed

-- sockets implemented on posting functionality(posts.js, post.js, post view)

-- 

## Project Assignment 03

list of files and additions made:

-- app.js started to add websockets functionality

-- routes/post.js added beginnings of private post functionality

-- lib/posts.js added more functions related to data access layer and started to add websockets functionality

-- header.ejs updated to show currently logged in user at top of each page (dynamically)

-- users.js added ability to signup as new user

-- login.js added support for sessions

-- signup.js

-- user.js added route for basic format user page

-- user.ejs page now shows information about user

-- NOTE: some of the necessities for this project assignment were not achievable due to the unexpected absence of 1 of the 4 people in the group

### Index
Shows 'Welcome to Jargn' with signup, or login form.
If a user is willing to sign up for the website, fill out all of the showed up columns including

* Username
* Password
* Confirm Password
* Email Address
* Fullname

Database will check whether typed info is matched/correct or not and will pop up the message

If a use is willing to login for the website, fill out

* Username
* Password

This will direct you to the home page

### Home
Home page (index page)

### Connect
Shows any interactions for a user from tweets will show in this page

### Discover
Discovers other users by matching a user's topics of posts. There are

* Posts
* Activity
* Who to follow
* Find friends

### Who to follow
Click 'here' next to 'Let's take a look at them!'.
You will see 4 recommended users so click whom you are interested in, then click 'go to his/her page'.
This will print whom you are browsing, and how many people you are interested in.


### Find friends
You can find users on Jargn. First, type in 
```sh
username
```
To search if typed-in username exists on Jargn.


### Search
* search: type the word

This directs a user to the matched results in a database

### Settings
Changes a user's setting by submitting save changes

* save changes

### Help
Shows helps

### Post
Composes new post with a maximum length of 140 letters (32-bits)
