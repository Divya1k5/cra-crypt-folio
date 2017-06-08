import React from 'react'
import { Switch, Route } from 'react-router';
import asyncImport from '../asyncComponent/AsyncImport';

const AsyncHome = asyncImport(() => { return import('../../pages/HomePage') });
const AsyncSummary = asyncImport(() => { return import('../../pages/SummaryPage') });
const AsyncNotFound = asyncImport(() => { return import('../../pages/NotFoundPage') });

export const routes = (
    <Switch>
        <Route exact path="/" component={AsyncHome} />
        <Route exact path="/index.html" component={AsyncHome} />
        <Route exact path="/summary" component={AsyncSummary} />
        <Route component={AsyncNotFound} />
    </Switch>
);
