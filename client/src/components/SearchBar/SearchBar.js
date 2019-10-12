import React, {Component} from 'react';
import './SearchBar.css';
import Dropdown from "./Dropdown/Dropdown";

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: "",  // current text inside input element
            dropdown: []  // list of movies being shown in dropdown
        };

        this.showDropdown = this.showDropdown.bind(this);
        this.selectMovie = this.selectMovie.bind(this);
    }

    render() {
        return (
            <div className="SearchBar">
                <input
                    type="text"
                    id="movie-input"
                    placeholder="Enter film title..."
                    autoComplete="off"
                    value={this.state.text}
                    onChange={e => this.showDropdown(e.target.value)}/>

                {this.state.dropdown.length === 0 ?
                    null
                    :
                    <Dropdown movies={this.state.dropdown} selectMovie={this.selectMovie}/>
                }

                <button className="get-recs-button" onClick={this.props.getRecs}>Get Recommendations</button>
                <button className="clear-button" onClick={this.props.clearAll}>Clear All</button>

            </div>
        );
    }

    // show dropdown when text gets inputted in the search bar
    showDropdown(text) {
        // update input text
        this.setState({
            text: text
        });

        // show dropdown when there are at least 2 chars
        if (text.length > 1) {
            // filter arr with input text
            let arr = this.props.movies.filter(movie => movie.title.toLowerCase().includes(text.toLowerCase()));
            // console.log(arr);
            this.setState({
                dropdown: arr
            });
        } else {
            // clear dropdown
            this.setState({
                dropdown: []
            });
        }
    }

    // select a movie. passed to Dropdown and called on item click
    selectMovie(movie) {
        // movie selected
        if(movie !== null) {
            // console.log(movie);
            // add movie to list of selected movies in parent Component
            this.props.selectMovie(movie);
        }

        // clear dropdown
        this.setState({
            text: "",
            dropdown: [],
        });
    }

}

export default SearchBar;