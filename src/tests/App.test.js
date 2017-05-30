import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from '../components/appRoutes/AppRoutes';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppRoutes />, div);
});
