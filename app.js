var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var parseurl = require('parseurl');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var product = require('./routes/product');
var stock = require('./routes/stock');
var cart = require('./routes/cart');
var session = require('express-session');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myApp');

var app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept, x-fake-token');
    res.header("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    res.header("Pragma", "no-cache"); // HTTP 1.0.
    res.header("Expires", "0"); // Proxies.
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('trust proxy', 1); // trust first proxy

app.use(session({
  secret: 'myAppSecretK@y',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));


// Access the session as req.session 
app.use(function(req, res, next) {
  var sess = req.session;
  console.log('length:',sess.cart);
  /*if (!sess.cart.length) {
    console.log('FIRST TIME:');
    sess.cart = [];
  }*/ 

  next();
})


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(__dirname + '/uploads'));

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/product', product);
app.use('/stock', stock);
app.use('/cart', cart);




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
