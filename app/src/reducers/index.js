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
import about from './about';
import integral from './integral';
import weui from './weui';
import logisticsinfo from './logisticsinfo';
import evaluation from './evaluation';
import {
    login_err,
} from '../actions/index.js';

export default combineReducers(
  { 
    about,
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
    integral,
    weui,
    logisticsinfo,
    evaluation,
    form: formReducer.plugin({
      login: (state, action) => { // <------ 'account' is name of form given to reduxForm()
        // if(action.type === 'login_err')
        // switch(action.type) {
        //   case ACCOUNT_SAVE_SUCCESS:
        //     return undefined;       // <--- blow away form data
        //   default:
            if(action.type === login_err.getType()){
                console.log(`登录错误,清空密码action:${JSON.stringify(action)}`);
                console.log(`state:${JSON.stringify(state)}`);
                let values = {...state.values,['password']:''};
                state = {...state,values};
            }
            return state;
        }
      }),
  }
);
