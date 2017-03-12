import {
  showpopmessage,
  login_request,login_result,login_err,
  logout_request,

  inserttopic_request,inserttopic_result,
  getmytopic_request,getmytopic_result,
  gettopiclist_request,gettopiclist_result,
  insertcommentstotopic_request,insertcommentstotopic_result,
  insertcommentstocomments_request,insertcommentstocomments_result,
  lovetopicadd_request,lovetopicadd_result,
  lovetopicunadd_request,lovetopicunadd_result,
  lovecommentsadd_request,lovecommentsadd_result,
  lovecommentsunadd_request,lovecommentsunadd_result,

  createdevice_request, createdevice_result,
  getdevicelist_request,getdevicelist_result,
  deletedevice_request,deletedevice_result,

  createaddress_result,
  deleteaddress_result,
  editaddress_result,
  getaddresslist_result,

  disconnect,

  wait_createaddress_result,
  wait_editaddress_result,
  wait_register_result,
  wait_inserttopic_result,
  wait_createdevice_result
} from '../actions';
import {
  sendauth_request,sendauth_result,sendauth_err,
  register_request,register_result,register_err,
} from '../actions/index.js';
import {store} from '../store.js';

export function wsrecvhandler(socket,emit){
  socket.on('users.login_result', ({ profile }) => {
    emit(login_result( profile ));
  });
  socket.on('users.login_err',({errmsg})=>{
    emit(login_err());
    emit(showpopmessage({
      title:'登录失败',
      msg:errmsg,
      type:'error'
    }));
  });
  socket.on('users.sendauth_result',({errmsg})=>{
    emit(showpopmessage({
      title:'成功',
      msg:'发送验证码成功',
      type:'success'
    }));
  });
  socket.on('users.sendauth_err',({errmsg})=>{
    emit(showpopmessage({
      title:'发送验证码失败',
      msg:errmsg,
      type:'error'
    }));
  });
  socket.on('users.register_result',({errmsg})=>{
    emit(showpopmessage({
      title:'成功',
      msg:'注册成功',
      type:'success'
    }));
    emit(wait_register_result({result:'OK'}));
  });
  socket.on('users.register_err',({errmsg})=>{
    emit(showpopmessage({
      title:'注册失败',
      msg:errmsg,
      type:'error'
    }));
    emit(wait_register_result({err:errmsg}));
  });
  //-------------------------------
  socket.on('forum.inserttopic_result',({newtopic})=>{
    emit(inserttopic_result(newtopic));
    emit(wait_inserttopic_result({result:newtopic}));
  });
  socket.on('forum.getmytopic_result', ({ mytopiclist }) => {
    emit(getmytopic_result(mytopiclist ));
  });
  socket.on('forum.gettopiclist_result', ({ alltopiclist }) => {
    emit(gettopiclist_result( alltopiclist ));
  });
  socket.on('forum.lovetopicadd_result', ({ updatedtopic }) => {
    emit(lovetopicadd_result( updatedtopic ));
  });
  socket.on('forum.lovetopicunadd_result', ({ updatedtopic }) => {
    emit(lovetopicunadd_result( updatedtopic ));
  });
  socket.on('forum.lovecommentsadd_result', ({ updatedcomment }) => {
    emit(lovecommentsadd_result( updatedcomment ));
  });
  socket.on('forum.lovecommentsunadd_result', ({ updatedcomment }) => {
    emit(lovecommentsunadd_result( updatedcomment ));
  });
  socket.on('forum.insertcommentstotopic_result', ({ newcomments,updatedtopic }) => {
    emit(insertcommentstotopic_result( { newcomments,updatedtopic } ));
  });
  socket.on('forum.insertcommentstocomments_result', ({ newcomments,updatedcomment }) => {
    emit(insertcommentstocomments_result( { newcomments,updatedcomment }));
  });
  //-------------------------------
  socket.on('device.createdevice_result', ({ newdevice }) => {
    emit(createdevice_result( newdevice ));
    emit(wait_createdevice_result({result:newdevice}))
  });

  socket.on('device.getdevicelist_result', ({ mydevicelist }) => {
    emit(getdevicelist_result( mydevicelist ));
  });

  socket.on('device.deletedevice_result', ({_id}) => {
        emit(deletedevice_result( {_id} ));
  });
  //-------------------------------
  socket.on('address.createaddress_result', ({ newaddress }) => {
    emit(createaddress_result( newaddress ));
    //store.dispatch(wait_createaddress_result({result:{...newaddress},err:2}));
    emit(wait_createaddress_result({result:newaddress}));
  });

  socket.on('address.getaddresslist_result', ({ myaddresslist }) => {
    emit(getaddresslist_result( myaddresslist ));
  });
  socket.on('address.editaddress_result', ({ editedaddress }) => {
    emit(editaddress_result( editedaddress ));
    emit(wait_editaddress_result({result:editedaddress}));

  });
  socket.on('address.deleteaddress_result', ({_id}) => {
        emit(deleteaddress_result( {_id} ));
  });

  socket.on('disconnect', e => {
    emit(disconnect());
  });
}
