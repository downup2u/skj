import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import reducer from './reducers';
import saga from './sagas';

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" defaultIsVisible={false}>
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)

// let configureStore = (initialState)=> {
//   const sagaMiddleware = createSagaMiddleware();
//   const store = createStore(
//     reducer, initialState,
//       compose(
//         applyMiddleware(sagaMiddleware),
//         DevTools.instrument()
//       )
//   );
// //  sagaMiddleware.run(saga);
//   return store;
// }
//
// let store = configureStore();

const store = createStore(
  reducer,
  compose(
    DevTools.instrument()
  )
);

export {DevTools,store};
