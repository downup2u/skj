import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/index.js';
import {DevTools,store} from './store';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <div>
        <App />
      </div>
      <DevTools />
   </div>
  </Provider>,
  document.getElementById('root')
);
