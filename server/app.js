var compression = require('compression');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var recsRouter = require('./routes/getrecs');
var posterRouter = require('./routes/getposter');
var app = express();

app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('public'));


app.use('/getrecs', recsRouter);
app.use('/getposter', posterRouter);

module.exports = app;
