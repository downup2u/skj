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
  deletedevice_result,
  //地址
  createaddress_result,
  deleteaddress_result,
  editaddress_result,
  getaddresslist_result,

  serverpush_newtopic,

  newtopicfileuploadsetpreview,
  uicommentshow,
  uicommenthide
} from '../actions';
import {deletedevice_confirmpopshow,deletedevice_confirmpophide} from '../actions/index.js';
import {deleteaddress_confirmpopshow,deleteaddress_confirmpophide} from '../actions/index.js';
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
    users:{},
    selectedid:'',
    iscommentshow:false,
    selectedtype:'topic'
  },
  device:{
    mydevicelist:[],
    curdevice:{},
    isconfirmshow:false,
    poptitle:'',
    popmsg:'',
    deleteingdevice:{}
  },
  newtopicfileupload:{
      previewVisible: false,
      previewImage: '',
      fileList: [],
  },
  address:{
    addresslist:[],
    isconfirmshow:false,
    poptitle:'',
    popmsg:'',
    deleteingaddress:{}
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
      mytopiclist:[ ...newdocs.result.docs ],//这样分页就有问题
      topics: newdocs.entities.topics,
      comments: newdocs.entities.comments,
      users: newdocs.entities.users,
    };
  },
  [gettopiclist_result]: (state, payload) => {
    let newdocs = normalizrtopiclist(payload);
    return {...state,
          topiclist: [ ...newdocs.result.docs ],//这样分页就有问题
          topics: newdocs.entities.topics,
          comments: newdocs.entities.comments?newdocs.entities.comments:{},
          users: newdocs.entities.users,
        };
  },
  [inserttopic_result]: (state, payload) => {
    let newtopic = payload;
    return { ...state,
      topiclist:[newtopic._id,...state.topiclist],
      mytopiclist:[newtopic._id,...state.mytopiclist],
      topics:{
        ...state.topics,
        [newtopic._id]:newtopic
      }
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
  },
  [uicommentshow]: (state, payload) => {
    return {...state,selectedid:payload.selectedid,selectedtype:payload.selectedtype,iscommentshow:true};
  },
  [uicommenthide]: (state, payload) => {
    return {...state,iscommentshow:false};
  },

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
  [deletedevice_result]: (state, payload) => {
    let mydevicelist =  state.mydevicelist;
    let newdevicelist = [];
    for(let item of mydevicelist){
      if(item._id !== payload._id){
        newdevicelist.push(item);
      }
    }
    return { ...state,mydevicelist:[...newdevicelist]};
  },
  [deletedevice_confirmpopshow]: (state, payload) => {
    // isconfirmshow:false,
    // poptitle:'',
    // popmsg:''
    return { ...state,isconfirmshow:true,
      poptitle:payload.poptitle,popmsg:payload.popmsg,deleteingdevice:payload.deleteingdevice};
  },
  [deletedevice_confirmpophide]: (state, payload) => {
    return { ...state,isconfirmshow:false};
  },

}, initial.device);


const address = createReducer({
  [createaddress_result]: (state, payload) => {
    let newaddress = payload;
    return { ...state, addresslist:[newaddress,...state.addresslist] };
  },
  [editaddress_result]: (state, payload) => {
    let addresslist =  state.addresslist;
    let newaddresslist = [];
    for(let item of newaddresslist){
      if(item._id===payload._id){
        newaddresslist.push(payload);
      }
    }
    return { ...state,addresslist:[...newaddresslist]};
  },
  [getaddresslist_result]: (state, payload) => {
    let addresslist =  payload.docs;
    return { ...state,addresslist:addresslist};
  },
  [deleteaddress_result]: (state, payload) => {
    let addresslist =  state.addresslist;
    let newaddresslist = [];
    for(let item of addresslist){
      if(item._id !== payload._id){
        newaddresslist.push(item);
      }
    }
    return { ...state,addresslist:[...newaddresslist]};
  },
  [deleteaddress_confirmpopshow]: (state, payload) => {
    return { ...state,isconfirmshow:true,
      poptitle:payload.poptitle,popmsg:payload.popmsg,deleteingaddress:payload.deleteingaddress};
  },
  [deleteaddress_confirmpophide]: (state, payload) => {
    return { ...state,isconfirmshow:false};
  },

}, initial.address);

const newtopicfileupload = createReducer({
  [newtopicfileuploadsetpreview]: (state, payload) => {
    let newstate = state;
    if(payload.hasOwnProperty('previewVisible')){
      newstate =  { ...newstate, previewVisible:payload.previewVisible};
    }
    if(payload.hasOwnProperty('previewImage')){
      newstate =  { ...newstate, previewImage:payload.previewImage};
    }
    if(payload.hasOwnProperty('fileList')){
      newstate =  { ...newstate,fileList:[...payload.fileList]};
    }
    return newstate;
  },
},initial.newtopicfileupload);

export default combineReducers(
  { app,userlogin,forum,device,address,newtopicfileupload,form: formReducer}
);
