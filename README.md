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
Discovers other users by matching a user's topics of tweets

### My Profile
Shows a user's tweets, his followers, and followings.

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

