var express = require('express');
var router = express.Router();
const {spawn} = require("child_process");


router.post('/', (req, res, next) => {
    if(req.body.ids === undefined) {
        throw new Error('ERROR: getrecs ids is undefined');
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
