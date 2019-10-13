# Movie Recommender

Try it [here.](https://robbypark.com/movies/)

## About

This is a movie recommender system. You can enter a set of movies you like and get recommendations based on your choices.

This app uses React in the front-end (Create React App) and Node and Express in the back-end. The backend exposes a RESTful API which interfaces with the recommendation Python code with Node's `child_process` module. The recommender system implements the collaborative filtering algorithm SVD, a matrix fatorization technique applied on the [MovieLens](https://grouplens.org/datasets/movielens/) small dataset. Complete recommender code can be found [here](https://github.com/robbypark/171_movie_recommendation). The Movie Database (TMDb) API is used to fetch and display movie poster images. 

## Usage

In the dev environment, two localhost servers need to be run: one for the React front-end and one for the Node back-end. These run on `locahost:3000` and `localhost:3002` respectively. The FE proxies requests to `localhost:3002`.

#### Step 1: Server config

The server requires a config file containing the TMDb API key.  This is a JSON file:

```
# ./server/config/default.json:
{
  "apiKey": "TMDB_API_KEY_HERE";
}
```

#### Step 2: Start front-end dev server

```
$ cd client
$ npm install
$ npm run start
```

#### Step 3: Start back-end dev server

```
$ cd server
$ npm install
$ npm run start
```

#### Step 4: Try app in browser

Open `http://localhost:3000`


## Deployment

#### Step 1: Front-end

```
$ cd client
$ npm run build
```

Then host a static file server pointing to the /build/ directory.

#### Step 2: Back-end

```
$ cd server
$ npm run start
```
Use a reverse proxy like Nginx to proxy API requests to `localhost:3002`.


## Dependencies

See `package.json`. `npm install` will download all dependencies.

* npm v3.5.2
* React v16.10
* Express v4.16
* Python 3.6
