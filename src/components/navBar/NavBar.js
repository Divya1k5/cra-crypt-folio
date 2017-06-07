import React, { Component } from 'react';
import './NavBar.css';
import { withRouter } from 'react-router-dom'
import Tabs from 'react-toolbox/lib/tabs/Tabs';
import Tab from 'react-toolbox/lib/tabs/Tab';

export default class NavBar extends Component {

    constructor(props, context) {
        super(props, context);
        this.context = context;
        this.state = {
            index: 0
        };
    }

    handleTabChange(index) {
        this.setState({
            index
        });
    }

    handleTabClick(type) {
        if (type === 'HOME') {
            this.context.router.history.push('/');
        } else if (type === 'SUMMARY') {
            this.context.router.history.push('/summary');
        }
    }

    render() {
        return (
            <nav>
                <Tabs index={this.state.index} onChange={this.handleTabChange.bind(this)}>
                    <Tab label="Home" onClick={this.handleTabClick.bind(this, 'HOME')}></Tab>
                    <Tab label="Summary" onClick={this.handleTabClick.bind(this, 'SUMMARY')}></Tab>
                </Tabs>
            </nav>
        );
    }
}

NavBar.contextTypes = {
    router: React.PropTypes.object.isRequired
};