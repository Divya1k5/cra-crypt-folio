import React, { Component } from 'react';
import './NewContentBar.css';

export default class NewContentBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newContentAvailable: false
        };
    }

    componentDidMount() {
        window.addEventListener('newContentAvailable',  () => {
            if (!this.state.newContent) {
                this.setState({
                    newContentAvailable: true
                });
            }
        });
    }

    render() {
        return (
            <div id="NewContentNotification" className={this.state.newContentAvailable ? "": "hidden"}>
                New content is available; please refresh.
            </div>
        );
    }
}
