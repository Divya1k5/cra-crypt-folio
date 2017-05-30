import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/appRoutes/AppRoutes';
import registerServiceWorker from './sw/registerServiceWorker';

ReactDOM.render(<AppRoutes />, document.getElementById('root'));

registerServiceWorker();
