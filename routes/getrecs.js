var express = require('express');
var router = express.Router();
const {spawn} = require("child_process");


router.post('/', (req, res, next) => {
    console.log(req.body.ids);
    if(req.body.ids === undefined) {
        // error
    }

    const process = spawn('python3.6', ['./python/main.py', req.body.ids.toString()]);

    process.stdout.on('data', (data) => {
        console.log(data.toString());
        res.send(data.toString());
    });

    process.stderr.on('data', (data) => {
        console.error('stderr: ' + data.toString());
    });
});


module.exports = router;
