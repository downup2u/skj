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
import nextusers from './nextusers';
import order from './orderdetail';
import shopcart from './shopcart';
import shopcollection from './shopcollection';
import shoporder from './shoporder';
import infinitepage from './infinitepage';
import profit from './profit';
import paystatus from './paystatus';
import share from './share';

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
    order,
    shopcart,
    shopcollection,
    shoporder,
    notifymessage,
    infinitepage,
    nextusers,
    profit,
    paystatus,
    share,
    form: formReducer
  }
);
