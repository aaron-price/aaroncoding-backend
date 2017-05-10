var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session')
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
require("dotenv").config()
var URL = process.env.MONGODB_URI
var ObjectId = require('mongodb').ObjectID
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
const cors = require('cors')

// import schemas and models
const mongoose = require('mongoose');
require("./schemas/userSchema")

// import routes
var authRoutes = require('./routes/auth');
var routes = require('./routes/index');
var users = require('./routes/users');
const demo = require('./routes/demo');

var app = express();


// Allow cors
app.use('/api/demo', cors());
app.use("/api/users", cors());
app.use("/api/auth", cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
    name: 'session',
    keys: ["I am top secret!"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api/users', users);
app.use('/api/demo', demo);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
