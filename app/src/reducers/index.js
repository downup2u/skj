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
import wifi from './wifi';
import shop from './shop';
import shopcart from './shopcart';
import shopcollection from './shopcollection';
import shoporder from './shoporder';
import infinitepage from './infinitepage';

export default combineReducers(
  { 
    app,
    userlogin,
    forum,
    device,
    devicedata,
    address,
    newtopicfileupload,
    wifi,
    shop,
    shopcart,
    shopcollection,
    shoporder,
    infinitepage,
    form: formReducer
  }
);
