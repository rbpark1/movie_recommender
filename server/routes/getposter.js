var express = require('express');
var router = express.Router();
const https = require('https');
const config = require('config');

// ./config/default.json
let apiKey = config.get('apiKey');

router.get('/', function (req, res, next) {
    // request poster from TMDB
    https.get(`https://api.themoviedb.org/3/movie/${req.query.tmdbId}/images?api_key=${apiKey}&language=en-US&include_image_language=en,null`, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            let posterData = JSON.parse(data);
            if (posterData.posters && posterData.posters.length > 0) {
                res.send({'url': 'https://image.tmdb.org/t/p/w500/' + posterData.posters[0].file_path});  // img url
            } else {
                console.error('no posters found');
                res.status(204).send();
            }
        });

    }).on("error", (err) => {
        console.error("Error: " + err.message);
        res.status(500).send();
    });

});

module.exports = router;
