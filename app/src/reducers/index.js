import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import {
  clickTab,
  clickNavPage
} from '../actions';

const initial = {
  app: {
    curtabindex: 0
  },

};

const app = createReducer({
  [clickTab]: (state, payload) => {
    return { ...state, curtabindex: payload.curtabindex };
  },
  [clickNavPage]: (state, payload) => {
    return { ...state,action:payload.action,name:payload.name};
  },
}, initial.app);

export default combineReducers(
  { app }
);
