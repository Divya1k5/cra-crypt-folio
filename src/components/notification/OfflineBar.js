import React, { Component } from 'react';
import './OfflineBar.css';

export default class OfflineBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offline: navigator.onLine ? false : true
        };
    }

    componentDidMount() {
        window.addEventListener('online',  () => {
            if (this.state.offline) {
                this.setState({
                    offline: false
                });
            }
        });
        window.addEventListener('offline', () => {
            if (!this.state.offline) {
                this.setState({
                    offline: true
            });
            }
        });
    }

    render() {
        return (
            <div id="OfflineNotification" className={this.state.offline ? "": "hidden"}>
                You app is offline
            </div>
        );
    }
}
