
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});



/*
 * Login.
 */
var PORT = 3000;
var app  = require('express').createServer();
app.set('view options', { layout : false });
app.set('view engine',  'ejs');

// MongoDB setting
var mongoose = require('mongoose').Mongoose;

// Model for MangoDB
mongoose.model('User', {
    properties : [ 'userid', 'password', 'created_at' ],
    methods    : {
        save   : function (fn) {
            this.created_at = new Date();
            this.__super__(fn);
        }
    }
});

// Access to database
var db = mongoose.connect('mongodb://localhost:3000/mydb');


// Login
app.get("/", function (req, res) {
    res.render('index', {
        locals : { message : '' }
    });
});

// Submit
app.get("/login", function (req, res) {

    var res_error = function (mes) {
        res.render('index', {
            locals : { message : mes }
        });
    };

    var res_success = function (mes) {
        res.render('success', {
            locals : {
                "message"  : mes,
                "userid"   : userid,
                "password" : password
            }
        });
    };

    var userid     = req.param('userid');
    var password   = req.param('password');
    var create_new = req.param('new');

    // When userid is not valid
    if (! userid) {
        res_error('not valid "User ID"');
    }
    // When password is not valid
    if (! password) {
        res_error('not valid "password"');
    }

    var User  = db.model('User');
    var user  = new User();
    var i     = { "userid" : userid, "password" : password };

    // Create a new account
    if (create_new) {

        User.find(i).one(function (doc) {
            console.log(doc);
            // No duplicated userid so accesses to database
            if (doc == null) {
                user.userid   = userid;
                user.password = password;
                user.save();

                res_success('Welcome to Twitter');

            }
            // Duplicated userid
            else {
                res_error('choose different username');
            }
        });

    }
    // Login check
    else {
        User.find(i).one(function (doc) {
            console.log(doc);
            if (doc == null) {
                res_error("UserID or passwrod is not valid.");
            } else {
                res_success('logged in');
            }
        });

    }

});


app.listen(PORT);

