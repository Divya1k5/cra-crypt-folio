import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import AppShell from '../../components/appShell/AppShell';

export default class AppRoutes extends Component {
    render() {
        return (
            <Router onUpdate={() => window.scrollTo(0, 0)}>
                <Route path="/" component= {AppShell} />
            </Router>
        );
    }
}