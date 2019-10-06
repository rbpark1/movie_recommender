import React, { Component } from 'react';
import './App.css';
import SearchBar from "./SearchBar/SearchBar";
import Movie from "./Movie/Movie";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: [],  // list of all movies
      userMovies: [],  // movies currently selected by user
    };

    this.selectMovie = this.selectMovie.bind(this);
  }

  // initial code to run on start
  componentDidMount() {
    this.getFile('export_df.json')
  }

  render() {
    return (
      <div className="App">
        {this.state.movies === [] ?
            <div>Loading</div>
            :
            <SearchBar movies={this.state.movies} selectMovie={this.selectMovie}/>
        }
        <div>{this.state.userMovies.map(movie => <Movie movie={movie.title}/>)}</div>
      </div>
    );
  }

  // request export_df.json static file from server and updates movies
  getFile(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => this.setState({movies: data}))
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
}

export default App;