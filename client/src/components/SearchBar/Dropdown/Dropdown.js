import React, {Component} from 'react';
import './Dropdown.css';


class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.renderListItems = this.renderListItems.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

    }

    render() {
        return (
            <div className="Dropdown" ref={this.setWrapperRef}>
                {this.renderListItems(this.props.movies)}
            </div>
        );
    }

    renderListItems(movies) {
        if(movies === null) return;

        return movies.map(movie => {
            return (<p key={movie.movieId} onClick={() => this.props.selectMovie(movie)}>{movie.title}</p>)
        });
    }

    /**
     * Click-outside behavior
     * All of this stuff below is to make the dropdown close when clicking outside
     * See: https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
     */
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.selectMovie(null);
        }
    }

}

export default Dropdown;