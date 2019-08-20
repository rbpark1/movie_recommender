var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {spawn} = require("child_process");


var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.post('/getrecs', (req, res, next) => {
    console.log(req.body.ids);

    // TODO: Pass userMovies to Python
    const process = spawn('python3.6', ['./python/main.py', req.body.ids.toString()]);

    process.stdout.on('data', (data) => {
        console.log(data.toString());
        res.send(data.toString());
    });

    // process.stderr.on('data', (data) => {
    //     console.log('stderr: ' + data.toString());
    // });

});

module.exports = app;
