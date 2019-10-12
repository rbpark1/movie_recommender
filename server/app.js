var compression = require('compression');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var recsRouter = require('./routes/recs');
var posterRouter = require('./routes/poster');
var app = express();

app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Serve static files from /server/public/ - Disabled in production when using CRA frontend
// app.use(express.static('public'));

app.use('/recs', recsRouter);
app.use('/poster', posterRouter);

module.exports = app;
