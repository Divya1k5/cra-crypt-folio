import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import asyncImport from '../asyncComponent/AsyncImport';

export default class AppRoutes extends Component {

    constructor(props) {
        super(props);
        this.AsyncApp = asyncImport(() => { return import('../../components/app/App') });
    }

    render() {

        return (
            <Router onUpdate={() => window.scrollTo(0, 0)}>
                <Route path="/" component= {this.AsyncApp} />
            </Router>
        );
    }
}