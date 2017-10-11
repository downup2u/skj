const withdrawcash_comm = require('./withdrawcash_comm');
let DBModels = require('../../db/models.js');
const userlogin = require('../userlogin.js');
const config = require('../../../config.js');
//插入提现申请
exports.withdrawcashapplyaddone = (socket,payloaddata,ctx)=>{
//提现金额大于0 并且提现不大于当前余额
    let userModel = DBModels.UserModel;
    return withdrawcash_comm.withdrawcashapplyaddone(socket,payloaddata,ctx,
      userModel,'shop.withdrawcashapplyaddone_result');
}

//验证
exports.withdrawcashapplyauth = (socket,payloaddata,ctx)=>{
  let globalUserauth = userlogin.globalUserauth;
  let userModel = DBModels.UserModel;
  return withdrawcash_comm.withdrawcashapplyauth(socket,payloaddata,ctx,
    userModel,config.authexptime,globalUserauth,'shop.withdrawcashapplyauth_result');
};

exports.withdrawcashapplypaid = (updateditem,callback)=>{
  let userModel = DBModels.UserModel;
  return withdrawcash_comm.withdrawcashapplypaid(updateditem,callback,userModel);
}
