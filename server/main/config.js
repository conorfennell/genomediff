"use strict";

var bodyParser    = require('body-parser'),
    cookieParser  = require('cookie-parser'),
    middle        = require('./middleware'),
    mongoose      = require('mongoose'),
    morgan        = require('morgan');

mongoose.connect(process.env.DB_URL || 'mongodb://localhost/myApp');
/*
 * Include all your global env variables here.
*/
module.exports = exports = function (app, express, routers) {
  app.set('port', process.env.PORT || 9000);
  app.set('base url', process.env.URL || 'http://localhost');
  app.use(cookieParser("secret"));
  app.use(morgan('dev'));
  app.use(bodyParser());
  app.use(middle.cors);
  app.use(express.static(__dirname + '/../../client'));
  app.use('/login', routers.LoginRouter);
  app.use('/note' , routers.NoteRouter);
  app.use('/user'  , routers.UserRouter)
  app.use(middle.logError);
  app.use(middle.handleError);
};
