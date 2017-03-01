import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import {
  clickTab,
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
}, initial.app);

export default combineReducers(
  { app }
);
