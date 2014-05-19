'use strict';

var cookieParser = require('cookie-parser');
var express      = require('express');
var request      = require('request');

var app          = express();
var LoginRouter  = express.Router();
var NoteRouter   = express.Router();
var routers      = {};

routers.NoteRouter  = NoteRouter;
routers.LoginRouter = LoginRouter;

require('./config.js')(app, express, routers);

require('../login/login_routes.js')(LoginRouter);
require('../note/note_routes.js')(NoteRouter);

module.exports = exports = app;
