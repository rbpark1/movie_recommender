import React, {Component} from 'react';
import './Loading.css'

class Loading extends Component {
    render() {
        return (
            <div className="Loading">
                <h1>Loading...</h1>
                <i className="fas fa-spinner"/>
            </div>)
    }
}

export default Loading;