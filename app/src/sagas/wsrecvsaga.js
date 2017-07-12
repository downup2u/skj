import { put,takeEvery} from 'redux-saga/effects';
import {
  login_result,
  getdevicelist_request,
  sendauth_result,
  createaddress_result,
  wait_createaddress_result,
  md_createaddress,

  editaddress_result,
  wait_editaddress_result,
  md_editaddress,

  register_result,
  wait_register_result,
  md_register,

  findpwd_result,
  wait_findpwd_result,
  md_findpwd,

  inserttopic_result,
  wait_inserttopic_result,
  md_inserttopic,


  getnotifymessage_result,
  wait_getnotifymessage_result,
  md_getnotifymessage,

  getmytopic_result,
  wait_getmytopic_result,
  md_getmytopic,

  gettopiclist_result,
  wait_gettopiclist_result,
  md_gettopiclist,

  mycartgetall_result,
  wait_mycartgetall_result,
  md_mycartgetall,

  mycollectiongetall_result,
  wait_mycollectiongetall_result,
  md_mycollectiongetall,

  myordergetall_result,
  wait_myordergetall_result,
  md_myordergetall,

  mycartaddone_result,
  wait_mycartaddone_result,
  md_mycartaddone,

  mycartupdateone_result,
  wait_mycartupdateone_result,
  md_mycartupdateone,

  mycartdelone_result,
  wait_mycartdelone_result,
  md_mycartdelone,

  mycollectiondelone_result,
  wait_mycollectiondelone_result,
  md_mycollectiondelone,

  mycollectionisproductexits_result,
  wait_mycollectionisproductexits_result,
  md_mycollectionisproductexits,

  myorderaddone_result,
  wait_myorderaddone_result,
  md_myorderaddone,

  myorderupdateone_result,
  wait_myorderupdateone_result,
  md_myorderupdateone,

  productcommentsfromproduct_result,
  wait_productcommentsfromproduct_result,
  md_productcommentsfromproduct,

  productcommentaddone_result,
  wait_productcommentaddone_result,
  md_productcommentaddone,

  productcommentsfromproductgetcount_result,
  wait_productcommentsfromproductgetcount_result,
  md_productcommentsfromproductgetcount,

  withdrawcashapplyaddone_result,
  wait_withdrawcashapplyaddone_result,
  md_withdrawcashapplyaddone,

  withdrawcashapplyauth_result,
  wait_withdrawcashapplyauth_result,
  md_withdrawcashapplyauth,

  mycoupongetall_result,
  wait_mycoupongetall_result,
  md_mycoupongetall,

  getdistsalesorderdetails_result,
  wait_getdistsalesorderdetails_result,
  md_getdistsalesorderdetails,

  getpaysign_result,
  wait_getpaysign_result,
  md_getpaysign,

  getuserpointdetails_result,
  wait_getuserpointdetails_result,
  md_getuserpointdetails,

  oauthbinduser_result,
  wait_oauthbinduser_result,
  md_oauthbinduser,

  feedbackaddone_result,
  wait_feedbackaddone_result,
  md_feedbackaddone,

  common_err,
  showpopmessage,

  md_useraddpoint_result,
  set_weui,

  setuseralerttopicdeleted_result,
  loginwithoauth_result
} from '../actions';
import { push,goBack,go  } from 'react-router-redux';//https://github.com/reactjs/react-router-redux

const waitfnsz = [
  [
    createaddress_result,
    wait_createaddress_result,
    `${md_createaddress}`,
  ],
  [
    editaddress_result,
    wait_editaddress_result,
    `${md_editaddress}`,
  ],
  [
    register_result,
    wait_register_result,
    `${md_register}`,
  ],
  [
    findpwd_result,
    wait_findpwd_result,
    `${md_findpwd}`,
  ],
  [
    inserttopic_result,
    wait_inserttopic_result,
    `${md_inserttopic}`,
  ],
  [
    getnotifymessage_result,
    wait_getnotifymessage_result,
    `${md_getnotifymessage}`,
  ],
  [
    getmytopic_result,
    wait_getmytopic_result,
    `${md_getmytopic}`,
  ],
  [
    gettopiclist_result,
    wait_gettopiclist_result,
    `${md_gettopiclist}`,
  ],
  [
    mycartgetall_result,
    wait_mycartgetall_result,
    `${md_mycartgetall}`,
  ],
  [
    mycollectiongetall_result,
    wait_mycollectiongetall_result,
    `${md_mycollectiongetall}`,
  ],
  [
    myordergetall_result,
    wait_myordergetall_result,
    `${md_myordergetall}`,
  ],
  [
    mycartaddone_result,
    wait_mycartaddone_result,
    `${md_mycartaddone}`,
  ],
  [
    mycartupdateone_result,
    wait_mycartupdateone_result,
    `${md_mycartupdateone}`,
  ],
  [
    mycartdelone_result,
    wait_mycartdelone_result,
    `${md_mycartdelone}`,
  ],
  [
    mycollectiondelone_result,
    wait_mycollectiondelone_result,
    `${md_mycollectiondelone}`,
  ],
  [
    mycollectionisproductexits_result,
    wait_mycollectionisproductexits_result,
    `${md_mycollectionisproductexits}`,
  ],
  [
    myorderaddone_result,
    wait_myorderaddone_result,
    `${md_myorderaddone}`,
  ],
  [
    myorderupdateone_result,
    wait_myorderupdateone_result,
    `${md_myorderupdateone}`,
  ],
  [
    productcommentsfromproduct_result,
    wait_productcommentsfromproduct_result,
    `${md_productcommentsfromproduct}`,
  ],
  [
    productcommentaddone_result,
    wait_productcommentaddone_result,
    `${md_productcommentaddone}`,
  ],
  [
    productcommentsfromproductgetcount_result,
    wait_productcommentsfromproductgetcount_result,
    `${md_productcommentsfromproductgetcount}`,
  ],
  [
    withdrawcashapplyaddone_result,
    wait_withdrawcashapplyaddone_result,
    `${md_withdrawcashapplyaddone}`,
  ],
  [
    withdrawcashapplyauth_result,
    wait_withdrawcashapplyauth_result,
    `${md_withdrawcashapplyauth}`,
  ],
  [
    mycoupongetall_result,
    wait_mycoupongetall_result,
    `${md_mycoupongetall}`,
  ],
  [
    getdistsalesorderdetails_result,
    wait_getdistsalesorderdetails_result,
    `${md_getdistsalesorderdetails}`,
  ],
  [
    getpaysign_result,
    wait_getpaysign_result,
    `${md_getpaysign}`,
  ],
  [
    getuserpointdetails_result,
    wait_getuserpointdetails_result,
    `${md_getuserpointdetails}`,
  ],
  [
    oauthbinduser_result,
    wait_oauthbinduser_result,
    `${md_oauthbinduser}`,
  ],
  [
    feedbackaddone_result,
    wait_feedbackaddone_result,
    `${md_feedbackaddone}`,
  ],
];

// import _ from 'co-lodash';

export function* wsrecvsagaflow() {
  // yield* _.coMap(waitfnsz,function*(fnsz){
  //   yield takeEvery(fnsz[2], function*(action) {
  //       let {payload:result} = action;
  //       console.log(`takeEvery===>result:${JSON.stringify(result)}`);
  //       yield put(fnsz[0](result));
  //       yield put(fnsz[1]({result:result}));
  //   });
  // });
  for(let i = 0; i < waitfnsz.length; i ++){
      let fnsz = waitfnsz[i];
      yield takeEvery(fnsz[2], function*(action) {
          let {payload:result} = action;
          console.log(`takeEvery===>result:${JSON.stringify(result)}`);
          yield put(fnsz[0](result));
          yield put(fnsz[1]({result:result}));
      });
  }
  // gettopiclist_result,
  // wait_gettopiclist_result,
  // `${md_gettopiclist}`,
  // yield takeEvery(`${md_gettopiclist}`, function*(action) {
  //     let {payload:result} = action;
  //     console.log(`takeEvery===>result:${JSON.stringify(result)}`);
  //     yield put(gettopiclist_result(result));
  //     yield put(wait_gettopiclist_result({result:result}));
  // });sendauth_result
  yield takeEvery(`${sendauth_result}`, function*(action) {
        let {payload} = action;
        yield put(set_weui({toast:{
              show : true,
              text : `发送验证码成功`,
              type : "success"
          }}));

  });

  yield takeEvery(`${md_useraddpoint_result}`, function*(action) {
        let {payload} = action;
        let {err,result} = payload;
        console.log(`md_useraddpoint_result,result:${JSON.stringify(result)}`);
        if(!!result){
            yield put(set_weui({toast:{
                show : true,
                text : `${result.reason}获得${result.pointbonus}积分`,
                type : "success"
            }}));
        }

        if(!!err){
            yield put(set_weui({toast:{
                show : true,
                text : `${err}`,
                type : "warning"
            }}));
        }


  });


  yield takeEvery(`${common_err}`, function*(action) {
        let {payload:result} = action;
        console.log(`common_err:${JSON.stringify(result)}`);
        yield put(set_weui({toast:{
            show : true,
            text : result.errmsg,
            type : "warning"
        }}));
  });

  yield takeEvery(`${setuseralerttopicdeleted_result}`, function*(action) {

  });

  yield takeEvery(`${loginwithoauth_result}`, function*(action) {
    yield put(push('/userbind'));
  }


  yield takeEvery(`${login_result}`, function*(action) {
    yield put(getdevicelist_request({
      query: {},
      options: {
          page: 1,
          limit: 100,
      }}));
  });

}
