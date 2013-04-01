# Member
Adam Daehling, Mayu Kudo, Marcy Rattner, Kira Revere

## Before compiling
1) Download zipfiles of our folder
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
Discovers other users by matching a user's topics of tweets. There are

* Tweets
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

### Tweet
Composes new tweet with a maximum length of 140 letters (32-bits)
