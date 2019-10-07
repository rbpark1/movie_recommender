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

                {this.props.showRemove ?
                    <div className='remove-button' onClick={() => this.props.removeUserMovie(this.props.movie)}>
                        <i className="fas fa-times-circle"/>
                    </div>
                    :
                    null
                }


                <div className='img-container'>
                    <a href={"https://www.themoviedb.org/movie/" + this.props.movie.tmdbId}>
                        <img src={this.state.imgUrl === "" ? poster : this.state.imgUrl} alt='poster'/>
                    </a>
                </div>

                <div className='text-container'>
                    <h2>{this.props.movie.title}</h2>
                    <ul className='genres'>{this.renderGenres(this.props.movie.genres)}</ul>
                </div>
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
        let arr = genres.split('|');
        return arr.map(genre => (<li key={genre}>{genre}</li>));
    }
}

export default Movie;