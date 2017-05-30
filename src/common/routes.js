import React from 'react'
import { Switch, Route } from 'react-router';
import HomePage from '../pages/HomePage';
import SummaryPage from '../pages/SummaryPage';
import NotFoundPage from '../pages/NotFoundPage';

export const routes = (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/summary" component={SummaryPage} />
        <Route component={NotFoundPage} />
    </Switch>
);
