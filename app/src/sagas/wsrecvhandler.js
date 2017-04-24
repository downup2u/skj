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
    mycartupdateone_result,
    mycartdelone_result,
    mycartgetall_result,
    mycollectionaddone_result,
    mycollectiondelone_result,
    mycollectiongetall_result,
    myorderaddone_result,
    myorderupdateone_result,
    myorderdelone_result,
    myordergetall_result,
    getnews_result,
  
    wait_mycartgetall_result,
    wait_mycollectiongetall_result,
    wait_myordergetall_result,

    wait_mycartaddone_result,
    wait_mycartupdateone_result,
    wait_mycartdelone_result,
    wait_mycollectiondelone_result,

    wait_mycollectionisproductexits_result,
    mycollectionisproductexits_result,

    serverpush_mycartcount,

    
    wait_myorderaddone_result,
    wait_myorderupdateone_result,

      
    productcommentsfromproduct_result,
    wait_productcommentsfromproduct_result,

    productcommentaddone_result,
    wait_productcommentaddone_result,

    productcommentsfromproductgetcount_result,
    wait_productcommentsfromproductgetcount_result,

    withdrawcashapplyaddone_result,
    wait_withdrawcashapplyaddone_result,
    
    withdrawcashapplyauth_result,
    wait_withdrawcashapplyauth_result,

    mycoupongetall_result,
    wait_mycoupongetall_result,

    getnextusers_result,
    getdistsalesorderstat_result,
    getdistsalesorders_result,    

    getsystemconfig_result,

    getdistsalesorderdetails_result,
    wait_getdistsalesorderdetails_result,

    serverpush_defaultaddress,

    wait_getpaysign_result,
    getpaysign_result,
    getpaysign_err,

    serverpush_usermoney,
    getusergetpointsigntoday_result,
    getuserpointdetails_result,
    wait_getuserpointdetails_result,

    serverpush_orderinfo,
    loginwithoauth_result,

    oauthbinduser_result,
    wait_oauthbinduser_result,
    setlastreadmsgtime_result,

    feedbackaddone_result,
    wait_feedbackaddone_result,
    getabouthtml_result,

    set_weui,

    expressquery_result
} from '../actions';
import {
  sendauth_request,sendauth_result,sendauth_err,
  register_request,register_result,register_err,
} from '../actions/index.js';


const handlerlist = {
  ['shop.expressquery_result']:(socket,emit)=>{
    return (result)=> {
      emit(expressquery_result(result));
    }
  },
  ['getabouthtml_result']:(socket,emit)=>{
    return (result)=> {
      emit(getabouthtml_result(result));
    }
  },
  ['app.feedbackaddone_result']:(socket,emit)=>{
    return (result)=>{
      emit(feedbackaddone_result(result));
      emit(wait_feedbackaddone_result({result:result}));
    }
  },
  ['setlastreadmsgtime_result']: (socket, emit)=> {
      return (result)=>{
        emit(setlastreadmsgtime_result(result));
      }
  },
  ['oauthbinduser_err']: (socket, emit)=> {
    return (({errmsg})=> {
      emit(set_weui({toast:{
          show : true,
          text : errmsg,
          type : "warning"
      }}));
      emit(wait_oauthbinduser_result({err: errmsg}));
    });
  },
  ['oauthbinduser_result']:(socket,emit)=>{
    return (result)=>{
      emit(set_weui({toast:{
          show : true,
          text : "绑定成功:",
          type : "success"
      }}));
      emit(oauthbinduser_result(result));
      emit(wait_oauthbinduser_result({result:result}));
    }
  },
  ['loginwithoauth_result']:(socket,emit)=>{
    return (result)=>{
      emit(loginwithoauth_result(result));
    }
  },
  ['serverpush_orderinfo']:(socket,emit)=>{
    return (result)=>{
      emit(serverpush_orderinfo(result));
    }
  },
  ['serverpush_usermoney']:(socket,emit)=>{
    return (result)=>{
      emit(serverpush_usermoney(result));
    }
  },
  ['shop.getusergetpointsigntoday_result']:(socket,emit)=>{
    return (result)=>{
      emit(getusergetpointsigntoday_result(result));
    }
  },
   ['shop.getuserpointdetails_result']:(socket,emit)=>{
    return (result)=>{
      emit(getuserpointdetails_result(result));
      emit(wait_getuserpointdetails_result({result:result}));
    }
  },
 ['getpaysign_result']:(socket,emit)=>{
    return (result)=>{
      emit(wait_getpaysign_result({result:result}));
    }
  },
  ['getpaysign_err']:(socket,emit)=>{
    return ({errmsg})=>{
      emit(wait_getpaysign_result({err:errmsg}));
    }
  },
    ['serverpush_defaultaddress']: (socket, emit)=> {
      return ((payload) => {
        emit(serverpush_defaultaddress(payload));
      });
     },
    ['getsystemconfig_result']: (socket, emit)=> {
      return ((payload) => {
        emit(getsystemconfig_result(payload));
      });
     },
     ['shop.getnextusers_result']: (socket, emit)=> {
      return ((payload) => {
        emit(getnextusers_result(payload));
      });
     },
      ['shop.getdistsalesorderstat_result']: (socket, emit)=> {
      return ((payload) => {
        emit(getdistsalesorderstat_result(payload));
      });
     },
     ['shop.getdistsalesorders_result']: (socket, emit)=> {
      return ((payload) => {
        emit(getdistsalesorders_result(payload));
      });
     },
     ['shop.getdistsalesorderdetails_result']: (socket, emit)=> {
      return ((payload) => {
        emit(getdistsalesorderdetails_result(payload));
        emit(wait_getdistsalesorderdetails_result({result:payload}));
      });
     },
      ['shop.mycoupongetall_result']: (socket, emit)=> {
      return ((payload) => {
        emit(mycoupongetall_result(payload));
        emit(wait_mycoupongetall_result({result:payload}));
      });
     },
      ['shop.withdrawcashapplyaddone_result']: (socket, emit)=> {
      return ((payload) => {
        emit(withdrawcashapplyaddone_result(payload));
        emit(wait_withdrawcashapplyaddone_result({result:payload}));
      });
     },
      ['shop.withdrawcashapplyauth_result']: (socket, emit)=> {
      return ((payload) => {
        emit(withdrawcashapplyauth_result(payload));
        emit(wait_withdrawcashapplyauth_result({result:payload}));
      });
     },
     ['shop.productcommentsfromproduct_result']: (socket, emit)=> {
      return ((payload) => {
        emit(productcommentsfromproduct_result(payload));
        emit(wait_productcommentsfromproduct_result({result:payload}));
      });
     },
      ['shop.productcommentaddone_result']: (socket, emit)=> {
      return ((payload) => {
        emit(productcommentaddone_result(payload));
        emit(wait_productcommentaddone_result({result:payload}));
      });
     },
     ['shop.productcommentsfromproductgetcount_result']: (socket, emit)=> {
      return ((payload) => {
        emit(productcommentsfromproductgetcount_result(payload));
        emit(wait_productcommentsfromproductgetcount_result({result:payload}));
      });
     },
    ['serverpush_mycartcount']:(socket,emit)=>{
       return  ((payload) => {
         emit(serverpush_mycartcount(payload));
      });
     },
     ['shop.getnews_result']:(socket,emit)=>{
       return  ((payload) => {
         emit(getnews_result(payload));
      });
     },
     ['shop.myorderaddone_result']: (socket, emit)=> {
      return ((payload) => {
        emit(myorderaddone_result(payload));
        emit(wait_myorderaddone_result({result:payload}));
      });
     },
    ['shop.myorderupdateone_result']: (socket, emit)=> {
      return ((payload) => {
        emit(myorderupdateone_result(payload));
        emit(wait_myorderupdateone_result({result:payload}));
      });
    },
    ['shop.myorderdelone_result']: (socket, emit)=> {
      return ((payload) => {
        emit(myorderdelone_result(payload));
      });
    },
    ['shop.myordergetall_result']: (socket, emit)=> {
      return ((result) => {
        emit(myordergetall_result(result));
        emit(wait_myordergetall_result({result:result}));
      });
    },
    ['shop.mycartaddone_result']: (socket, emit)=> {
      return ((result) => {
        emit(mycartaddone_result(result));
        emit(wait_mycartaddone_result({result:result}));
      });
    },
    ['shop.mycartupdateone_result']: (socket, emit)=> {
      return ((payload) => {
        emit(mycartupdateone_result(payload));
        emit(wait_mycartupdateone_result({result:payload}));
      });
    },
    ['shop.mycartdelone_result']: (socket, emit)=> {
      return ((payload) => {
        emit(mycartdelone_result(payload));
        emit(wait_mycartdelone_result({result:payload}));
      });
    },
    ['shop.mycartgetall_result']: (socket, emit)=> {
      return ((result) => {
        emit(mycartgetall_result(result));
        emit(wait_mycartgetall_result({result:result}));
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
        emit(wait_mycollectiondelone_result({result:payload}));
      });
    },
    ['shop.mycollectionisproductexits_result']: (socket, emit)=> {
      return ((payload) => {
        emit(mycollectionisproductexits_result(payload));
        emit(wait_mycollectionisproductexits_result({result:payload}));
      });
    },
    ['shop.mycollectiongetall_result']: (socket, emit)=> {
      return ((result) => {
        emit(mycollectiongetall_result(result));
        emit(wait_mycollectiongetall_result({result:result}));
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
      emit(set_weui({toast:{
          show : true,
          text : errmsg,
          type : "warning"
      }}));
    });
  },
  ['users.sendauth_result']: (socket, emit)=> {
    return (({authcode})=> {
      emit(set_weui({toast:{
          show : true,
          text : "验证码:"+authcode,
          type : "warning"
      }}));
    });
  },
  ['users.sendauth_err']: (socket, emit)=> {
    return (({errmsg})=> {
      emit(set_weui({toast:{
          show : true,
          text : errmsg,
          type : "warning"
      }}));
    });
  },
  ['users.register_result']: (socket, emit)=> {
    return (({errmsg})=> {
      emit(set_weui({toast:{
          show : true,
          text : "注册成功",
          type : "success"
      }}));
      emit(wait_register_result({result: 'OK'}));
    });
  },
  ['users.register_err']: (socket, emit)=> {
    return (({errmsg})=> {
      emit(set_weui({toast:{
          show : true,
          text : errmsg,
          type : "warning"
      }}));
      emit(wait_register_result({err: errmsg}));
    });
  },
  ['findpwd_result']: (socket, emit)=> {
    return (({errmsg})=> {
      emit(set_weui({toast:{
          show : true,
          text : "重置密码成功",
          type : "success"
      }}));
      emit(wait_findpwd_result({result: 'OK'}));
    });
  },
  ['findpwd_err']: (socket, emit)=> {
    return (({errmsg})=> {
      emit(set_weui({toast:{
          show : true,
          text : "重置密码失败:"+errmsg,
          type : "success"
      }}));
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
