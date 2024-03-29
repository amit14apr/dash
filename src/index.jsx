import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';

// setup serverless backend
// import { configureServerLess } from './_helpers';
// configureServerLess();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);