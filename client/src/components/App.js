import React, {Component} from 'react';
import './App.css';
import SearchBar from "./SearchBar/SearchBar";
import Movie from "./Movie/Movie";
import Loading from "./Loading/Loading";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            movies: [],  // list of all movies
            userMovies: [],  // movies currently selected by user
            recs: []  // list of recommended movies
        };

        this.selectMovie = this.selectMovie.bind(this);
        this.removeUserMovie = this.removeUserMovie.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.getRecs = this.getRecs.bind(this);
    }

    // initial code to run on start
    componentDidMount() {
        this.getFile('export_df.json')
    }

    render() {
        return (
            <div className="App">

                {this.state.loading ?
                    <Loading/>
                    :
                    null
                }

                <SearchBar movies={this.state.movies} selectMovie={this.selectMovie} clearAll={this.clearAll}
                           getRecs={this.getRecs}/>

                <h1>Your selected films:</h1>
                <div className='movie-container'>
                    {this.state.userMovies.map(movie => <Movie key={movie.movieId} movie={movie} showRemove={true}
                                                               removeUserMovie={this.removeUserMovie}/>)}
                </div>


                <h1>Recommendations:</h1>
                <div className='movie-container'>
                    {this.state.recs.map(movie => <Movie key={movie.movieId} movie={movie} showRemove={false}
                                                         removeUserMovie={this.removeUserMovie}/>)}
                </div>

            </div>
        );
    }

    // fetches recs from server and sets this.state.recs
    getRecs() {
        if (this.state.userMovies.length < 1) {
            alert('Please select a movie.');
            return;
        }

        this.setState({
            loading: true
        });

        let movieIds = this.state.userMovies.map(movie => movie.movieId);
        let body = {"ids": movieIds};
        console.log(body);
        fetch('/getrecs', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => this.showRecs(data))
    }

    // input: array of movieIds
    showRecs(data) {
        let arr = data.map(movieId => this.state.movies.find(movie => (movie.movieId === movieId)));
        console.log(arr);
        this.setState({
            loading: false,
            recs: arr
        })
    }

    // clear all movies
    clearAll() {
        this.setState({
            userMovies: [],
            recs: [],
        })
    }

    // request export_df.json static file from server and updates movies
    getFile(url) {
        fetch(url)
            .then(response => response.json())
            .then(data =>
                this.setState({
                    loading: false,
                    movies: data
                }))
            .catch(error => console.error(error));
    }

    // called by SearchBar, adds movie to userMovies
    selectMovie(movie) {
        // set to make list unique
        let set = new Set([...this.state.userMovies, movie]);
        this.setState({
            userMovies: [...set]
        });
    }

    // removes a userMovie
    removeUserMovie(target) {
        let filteredUserMovies = this.state.userMovies.filter(movie => movie.movieId !== target.movieId);
        this.setState({
            userMovies: filteredUserMovies
        });
    }
}

export default App;