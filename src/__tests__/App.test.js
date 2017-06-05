import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from '../components/appRoutes/AppRoutes';

describe('Render Testing App', () => {
  it('App renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppRoutes />, div);
  });
});

