import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import app from './app';
import userlogin from './userlogin';
import forum from './forum';
import device from './device';
import address from './address';
import newtopicfileupload from './newtopicfileupload';
import devicedata from './devicedata';
import notifymessage from './notifymessage';

export default combineReducers(
  { app,userlogin,forum,device,devicedata,address,newtopicfileupload,notifymessage,form: formReducer}
);
