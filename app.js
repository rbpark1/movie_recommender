var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var recsRouter = require('./routes/getrecs');
var posterRouter = require('./routes/getposter');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/getrecs', recsRouter);
app.use('/getposter', posterRouter);

module.exports = app;
