import React, {Component} from 'react';
import './Movie.css'
import poster from '../../res/poster-placeholder.png'

class Movie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imgUrl: "",
        }
    }

    componentDidMount() {
        this.requestPoster(this.props.movie.tmdbId)
    }

    render() {
        return (
            <div className='Movie'>
                <a href={"https://www.themoviedb.org/movie/" + this.props.movie.tmdbId}>
                    <img src={this.state.imgUrl === "" ? poster : this.state.imgUrl} alt='poster'/>
                </a>
                <h2>{this.props.movie.title}</h2>
                {this.renderGenres(this.props.movie.genres)}
                <button onClick={() => this.props.removeUserMovie(this.props.movie)}>Remove</button>
            </div>
        );
    }

    requestPoster(tmdbId) {
        fetch("/getposter?tmdbId=" + tmdbId)
            .then(response => response.json())
            .then(data => this.setState({imgUrl: data.url}))
            .catch(error => console.error(error));
    }

    renderGenres(genres) {
        return <p>{genres}</p>
    }
}

export default Movie;