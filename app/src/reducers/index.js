import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import { reducer as formReducer } from 'redux-form';
import {
  clickTab,
  clickNavPage,
  //登录
  login_result,
  login_err,
  showpopmessage,
  hidepopmessage,
  //圈子
  inserttopic_result,
  getmytopic_result,
  gettopiclist_result,
  insertcommentstotopic_result,
  insertcommentstocomments_result,
  lovetopicadd_result,
  lovetopicunadd_result,
  lovecommentsadd_result,
  lovecommentsunadd_result,
  //设备
  createdevice_result,
  getdevicelist_result,

  serverpush_newtopic
} from '../actions';

import {normalizrtopiclist} from './normalizr.js';

const initial = {
  app: {
    curtabindex: 0,
    type:'error',
    title:'',
    msg:'',
    ispop:false
  },
  userlogin:{
    loginsuccess:false,
    profile:{},
  },
  forum:{
    mytopiclist:[],
    topiclist:[],
    topics:{},
    comments:{},
    users:{}
  },
  device:{
    mydevicelist:[],
    curdevice:{}
  }
};

const app = createReducer({
  [clickTab]: (state, payload) => {
    return { ...state, curtabindex: payload.curtabindex };
  },
  [showpopmessage]:(state, payload) => {
    return { ...state,msg:payload.msg,title:payload.title,type:payload.type,ispop:true};
  },
  [hidepopmessage]:(state, payload) => {
    return { ...state,msg:'',title:'',ispop:false};
  },
}, initial.app);

const userlogin = createReducer({
  [login_result]: (state, payload) => {
    return { ...state, profile: payload,loginsuccess:true };
  },
  [login_err]: (state, payload) => {
    return { ...state, loginsuccess:false};
  },
  // [sendauth_result]: (state, payload) => {
  //   return { ...state, loginsuccess:false};
  // },
  // [sendauth_err]: (state, payload) => {
  //   return { ...state, loginsuccess:false};
  // },
  // [register_result]: (state, payload) => {
  //   return { ...state, loginsuccess:false};
  // },
  // [register_err]: (state, payload) => {
  //   return { ...state, loginsuccess:false};
  // },
}, initial.userlogin);



/*
array:mytopiclist:
array:alltopiclist
topcis:{
'id'：{...},
'id':{....}
}
comments:{
'id'：{...},
'id':{....}
}
users:{
'id':{},
'id':{},
...
}
*/
const forum = createReducer({
  [getmytopic_result]: (state, payload) => {
    let newdocs = normalizrtopiclist(payload);
    return { ...state,
      mytopiclist:[ ...state.topiclist, ...newdocs.result.docs ],
      topics: newdocs.entities.topics,
      comments: newdocs.entities.comments,
      users: newdocs.entities.users,
    };
  },
  [gettopiclist_result]: (state, payload) => {
    let newdocs = normalizrtopiclist(payload);
    return {...state,
          topiclist: [ ...state.topiclist, ...newdocs.result.docs ],
          topics: newdocs.entities.topics,
          comments: newdocs.entities.comments,
          users: newdocs.entities.users,
        };
  },
  [inserttopic_result]: (state, payload) => {
    let newtopic = payload;
    return { ...state,
      topiclist:[newtopic,...state.topiclist],
      mytopiclist:[newtopic,...state.mytopiclist]
    };
  },
  [lovetopicadd_result]: (state, payload) => {
    let updatedtopic = payload;
    return { ...state,
      topics:{
        ...state.topics,
        [updatedtopic._id]:updatedtopic
      }
    };
  },
  [lovetopicunadd_result]: (state, payload) => {
    let updatedtopic = payload;
    return { ...state,
      topics:{
        ...state.topics,
        [updatedtopic._id]:updatedtopic
      }
    };
  },
  [lovecommentsadd_result]: (state, payload) => {
    let updatedcomment = payload;
    return { ...state,
      comments:{
        ...state.comments,
        [updatedcomment._id]:updatedcomment
      }
    };
  },
  [lovecommentsunadd_result]: (state, payload) => {
    let updatedcomment = payload;
    return { ...state,
      comments:{
        ...state.comments,
        [updatedcomment._id]:updatedcomment
      }
    };
  },
  [insertcommentstotopic_result]: (state, payload) => {
    let { newcomments,updatedtopic }  = payload;
    if(newcomments){
      return { ...state,
        comments:{
          ...state.comments,
          [newcomments._id]:newcomments
        }
      };
    }
    if(updatedtopic){
      return { ...state,
        topics:{
          ...state.topics,
          [updatedtopic._id]:updatedtopic
        }
      };
    }
  },
  [insertcommentstocomments_result]: (state, payload) => {
     let { newcomments,updatedcomment } = payload;
     if(newcomments){
       return { ...state,
         comments:{
           ...state.comments,
           [newcomments._id]:newcomments
         }
       };
     }
     if(updatedcomment){
       return { ...state,
         comments:{
           ...state.comments,
           [updatedcomment._id]:updatedcomment
         }
       };
     }
  }
}, initial.forum);

const device = createReducer({
  [createdevice_result]: (state, payload) => {
    let newdevice = payload;
    return { ...state, mydevicelist:[newdevice,...state.mydevicelist],curdevice:newdevice };
  },
  [getdevicelist_result]: (state, payload) => {
    let mydevicelist =  payload.docs;
    return { ...state,mydevicelist:mydevicelist};
  },
}, initial.device);

export default combineReducers(
  { app,userlogin,forum,device,form: formReducer}
);
