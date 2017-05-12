import { createAction } from 'redux-act';

//需经过saga复杂处理的特殊消息
export const md_createaddress= createAction('md_createaddress');
export const md_editaddress= createAction('md_editaddress');
export const md_register= createAction('md_register');
export const md_findpwd= createAction('md_findpwd');
export const md_inserttopic= createAction('md_inserttopic');
export const md_createdevice= createAction('md_createdevice');
export const md_getnotifymessage= createAction('md_getnotifymessage');
export const md_getmytopic= createAction('md_getmytopic');
export const md_gettopiclist= createAction('md_gettopiclist');
export const md_mycartgetall= createAction('md_mycartgetall');
export const md_mycollectiongetall= createAction('md_mycollectiongetall');
export const md_myordergetall= createAction('md_myordergetall');
export const md_mycartaddone= createAction('md_mycartaddone');
export const md_mycartupdateone= createAction('md_mycartupdateone');
export const md_mycartdelone= createAction('md_mycartdelone');
export const md_mycollectiondelone= createAction('md_mycollectiondelone');
export const md_mycollectionisproductexits= createAction('md_mycollectionisproductexits');
export const md_myorderaddone= createAction('md_myorderaddone');
export const md_myorderupdateone= createAction('md_myorderupdateone');
export const md_productcommentsfromproduct= createAction('md_productcommentsfromproduct');
export const md_productcommentaddone= createAction('md_productcommentaddone');
export const md_productcommentsfromproductgetcount= createAction('md_productcommentsfromproductgetcount');
export const md_withdrawcashapplyaddone= createAction('md_withdrawcashapplyaddone');
export const md_withdrawcashapplyauth= createAction('md_withdrawcashapplyauth');
export const md_mycoupongetall= createAction('md_mycoupongetall');
export const md_getdistsalesorderdetails= createAction('md_getdistsalesorderdetails');
export const md_getpaysign= createAction('md_getpaysign');
export const md_getuserpointdetails= createAction('md_getuserpointdetails');
export const md_oauthbinduser= createAction('md_oauthbinduser');
export const md_feedbackaddone= createAction('md_feedbackaddone');

export const md_useraddpoint_result= createAction('md_useraddpoint_result');
