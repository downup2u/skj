import {
  showpopmessage,
  login_result,login_err,


  inserttopic_result,
  getmytopic_result,
  gettopiclist_result,
  wait_getmytopic_result,
  wait_gettopiclist_result,
  insertcommentstotopic_result,
  insertcommentstocomments_result,
  lovetopicadd_result,
  lovetopicunadd_result,
  lovecommentsadd_result,
  lovecommentsunadd_result,

  createdevice_result,
  getdevicelist_result,
  deletedevice_result,
  getnotifymessage_result,
  wait_getnotifymessage_result,
  createaddress_result,
  deleteaddress_result,
  editaddress_result,
  getaddresslist_result,

  wait_createaddress_result,
  wait_editaddress_result,
  wait_register_result,
  wait_inserttopic_result,
  wait_createdevice_result,
    fillprofile_result,
    logout_result,
    findpwd_result,
    findpwd_err,
    wait_findpwd_result,
    serverpush_useralerttopic,
    serverpush_useralerttopiclist,
    setuseralerttopicreaded_result,

    getbanner_result,
    getcategory_result,
    getproduct_result,

    mycartaddone_result,
    mycartdelone_result,
    mycartgetall_result,
    mycollectionaddone_result,
    mycollectiondelone_result,
    mycollectiongetall_result,
    myorderaddone_result,
    myorderupdateone_result,
    myorderdelone_result,
    myordergetall_result,
    getnews_result
} from '../actions';
import {
  sendauth_request,sendauth_result,sendauth_err,
  register_request,register_result,register_err,
} from '../actions/index.js';
import {store} from '../env/store.js';



const handlerlist = {
     ['shop.getnews_result']:(socket,emit)=>{
       return  ((payload) => {
         emit(getnews_result(payload));
      });
     },
     ['shop.myorderaddone_result']: (socket, emit)=> {
      return ((payload) => {
        emit(myorderaddone_result(payload));
      });
     },
    ['shop.myorderupdateone_result']: (socket, emit)=> {
      return ((payload) => {
        emit(myorderupdateone_result(payload));
      });
    },
    ['shop.myorderdelone_result']: (socket, emit)=> {
      return ((payload) => {
        emit(myorderdelone_result(payload));
      });
    },
    ['shop.myordergetall_result']: (socket, emit)=> {
      return ((payload) => {
        emit(myordergetall_result(payload));
      });
    },
    ['shop.mycartaddone_result']: (socket, emit)=> {
      return ((payload) => {
        emit(mycartaddone_result(payload));
      });
    },
    ['shop.mycartdelone_result']: (socket, emit)=> {
      return ((payload) => {
        emit(mycartdelone_result(payload));
      });
    },
    ['shop.mycartgetall_result']: (socket, emit)=> {
      return ((payload) => {
        emit(mycartgetall_result(payload));
      });
    },
    ['shop.mycollectionaddone_result']: (socket, emit)=> {
      return ((payload) => {
        emit(mycollectionaddone_result(payload));
      });
    },
    ['shop.mycollectiondelone_result']: (socket, emit)=> {
      return ((payload) => {
        emit(mycollectiondelone_result(payload));
      });
    },
    ['shop.mycollectiongetall_result']: (socket, emit)=> {
      return ((payload) => {
        emit(mycollectiongetall_result(payload));
      });
    },
  ['shop.getbanner_result']: (socket, emit)=> {
    return ((payload) => {
      emit(getbanner_result(payload));
    });
  },
  ['shop.getcategory_result']: (socket, emit)=> {
    return ((payload) => {
      emit(getcategory_result(payload));
    });
  },
  ['shop.getproduct_result']: (socket, emit)=> {
    return ((payload) => {
      emit(getproduct_result(payload));
    });
  },
  ['serverpush_useralerttopic']: (socket, emit)=> {
    return ((payload) => {
      emit(serverpush_useralerttopic(payload));
    });
  },
  ['serverpush_useralerttopiclist']: (socket, emit)=> {
    return ((payload) => {
      emit(serverpush_useralerttopiclist(payload));
    });
  },
  ['setuseralerttopicreaded_result']: (socket, emit)=> {
    return ((payload) => {
      emit(setuseralerttopicreaded_result(payload));
    });
  },
  ['logout_result']: (socket, emit)=> {
    return ((payload) => {
      emit(logout_result(payload));
    });
  },
  ['users.login_result']: (socket, emit)=> {
    return ((payload) => {
      emit(login_result(payload));
    });
  },
  ['users.login_err']: (socket, emit)=> {
    return (({errmsg})=> {
      emit(login_err());
      emit(showpopmessage({
        title: '登录失败',
        msg: errmsg,
        type: 'error'
      }));
    });
  },
  ['users.sendauth_result']: (socket, emit)=> {
    return (({authcode})=> {
      emit(showpopmessage({
        title: '成功',
        msg: `发送验证码成功:${authcode}`,
        type: 'success'
      }));
    });
  },
  ['users.sendauth_err']: (socket, emit)=> {
    return (({errmsg})=> {
      emit(showpopmessage({
        title: '发送验证码失败',
        msg: errmsg,
        type: 'error'
      }));
    });
  },
  ['users.register_result']: (socket, emit)=> {
    return (({errmsg})=> {
      emit(showpopmessage({
        title: '成功',
        msg: '注册成功',
        type: 'success'
      }));
      emit(wait_register_result({result: 'OK'}));
    });
  },
  ['users.register_err']: (socket, emit)=> {
    return (({errmsg})=> {
      emit(showpopmessage({
        title: '注册失败',
        msg: errmsg,
        type: 'error'
      }));
      emit(wait_register_result({err: errmsg}));
    });
  },
  ['findpwd_result']: (socket, emit)=> {
    return (({errmsg})=> {
      emit(showpopmessage({
        title: '成功',
        msg: '找回密码成功',
        type: 'success'
      }));
      emit(wait_findpwd_result({result: 'OK'}));
    });
  },
  ['findpwd_err']: (socket, emit)=> {
    return (({errmsg})=> {
      emit(showpopmessage({
        title: '找回密码失败',
        msg: errmsg,
        type: 'error'
      }));
      emit(wait_findpwd_result({err: errmsg}));
    });
  },
  ['fillprofile_result']:(socket,emit)=>{
    return ({profile})=>{
      emit(fillprofile_result({profile}));
    }
  },
  ['forum.inserttopic_result']: (socket, emit)=> {
    return (({newtopic})=> {
      emit(inserttopic_result(newtopic));
      emit(wait_inserttopic_result({result: newtopic}));
    });
  },
  ['forum.getmytopic_result']: (socket, emit)=> {
    return ( (result) => {
      emit(getmytopic_result(result));
      emit(wait_getmytopic_result({result:result}));
    });
  },
  ['forum.gettopiclist_result']: (socket, emit)=> {
    return ( (result) => {
      emit(gettopiclist_result(result));
      emit(wait_gettopiclist_result({result:result}));
    });
  },
  ['forum.lovetopicadd_result']: (socket, emit)=> {
    return ( ({updatedtopic}) => {
      emit(lovetopicadd_result(updatedtopic));
    });
  },
  ['forum.lovetopicunadd_result']: (socket, emit)=> {
    return ( ({updatedtopic}) => {
      emit(lovetopicunadd_result(updatedtopic));
    });
  },
  ['forum.lovecommentsadd_result']: (socket, emit)=> {
    return ( ({updatedcomment}) => {
      emit(lovecommentsadd_result(updatedcomment));
    });
  },
  ['forum.lovecommentsunadd_result']: (socket, emit)=> {
    return ( ({updatedcomment}) => {
      emit(lovecommentsunadd_result(updatedcomment));
    });
  },
  ['forum.insertcommentstotopic_result']: (socket, emit)=> {
    return (({newcomments, updatedtopic}) => {
      emit(insertcommentstotopic_result({newcomments, updatedtopic}));
    });
  },
  ['forum.insertcommentstocomments_result']: (socket, emit)=> {
    return ( ({newcomments, updatedcomment}) => {
      emit(insertcommentstocomments_result({newcomments, updatedcomment}));
    });
  },
  ['device.createdevice_result']: (socket, emit)=> {
    return (({newdevice}) => {
      emit(createdevice_result(newdevice));
      emit(wait_createdevice_result({result: newdevice}))
    });
  },
  ['device.getdevicelist_result']: (socket, emit)=> {
    return (({mydevicelist}) => {
      emit(getdevicelist_result(mydevicelist));
    });
  },
  ['device.deletedevice_result']: (socket, emit)=> {
    return (({_id}) => {
      emit(deletedevice_result({_id}));
    });
  },
  ['address.createaddress_result']: (socket, emit)=> {
    return (({newaddress}) => {
      emit(createaddress_result(newaddress));
      //store.dispatch(wait_createaddress_result({result:{...newaddress},err:2}));
      emit(wait_createaddress_result({result: newaddress}));
    });
  },
  ['address.getaddresslist_result']: (socket, emit)=> {
    return (({myaddresslist}) => {
      emit(getaddresslist_result(myaddresslist));
    });
  },
  ['address.editaddress_result']: (socket, emit)=> {
    return (({editedaddress}) => {
      emit(editaddress_result(editedaddress));
      emit(wait_editaddress_result({result: editedaddress}));

    });
  },
  ['address.deleteaddress_result']: (socket, emit)=> {
    return (({_id}) => {
      emit(deleteaddress_result({_id}));
    });
  },
  ['getnotifymessage_result']: (socket, emit)=> {
    return ((result)=> {
      emit(getnotifymessage_result(result));
      emit(wait_getnotifymessage_result({result:result}));
    });
  },
};


export function wsrecvhandler(socket,emit){
  for(let handlername in handlerlist) {//不使用过滤
    socket.on(handlername,handlerlist[handlername](socket,emit));
  }
}
