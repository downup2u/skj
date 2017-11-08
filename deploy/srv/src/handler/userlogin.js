let DBModels = require('../db/models.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../log/log.js');
const uuid = require('node-uuid');
const crypto = require('crypto');
const Chance = require('chance');
const chance = new Chance();
const shop = require('./shop/index.js');
const address = require('./address');
const point = require('./shop/point');
const _ = require('lodash');

let getuseralerttopic = (socket,ctx)=>{
  let dbModel = DBModels.UserAlertTopicModel;
  dbModel.find({creator:ctx.userid}).populate([
      {path:'creator', select:'username profile.nickname profile.avatar'},
      {path:'topicself', model: 'Topic',
        populate:[
        {
          path:'creator', select:'username profile.nickname profile.avatar', model: 'User'
        },
        {
          path:'comments', model: 'Comment',
          populate: [{
            path: 'creator',
            select:'username profile.nickname profile.avatar',
            model: 'User'
          },{
            path: 'loves',
            select:'username profile.nickname profile.avatar',
            model: 'User'
          },
            {
              path: 'comments',model:'Comment',
              populate: [{
                path: 'creator',
                select:'username profile.nickname profile.avatar',
                model: 'User'
              },{
                path: 'loves',
                select:'username profile.nickname profile.avatar',
                model: 'User'
              }]
            },
          ]
        },
        {
          path:'loves', select:'username profile.nickname profile.avatar', model: 'User'
        },
      ]},
      {path:'commentself', model: 'Comment',
        populate: [{
          path: 'creator',
          select:'username profile.nickname profile.avatar',
          model: 'User'
        },{
          path: 'loves',
          select:'username profile.nickname profile.avatar',
          model: 'User'
        },
          {
            path: 'comments',model:'Comment',
            populate: [{
              path: 'creator',
              select:'username profile.nickname profile.avatar',
              model: 'User'
            },{
              path: 'loves',
              select:'username profile.nickname profile.avatar',
              model: 'User'
            }]
          },
        ]
       },
      {path:'comment', model: 'Comment',
          populate: [{
              path: 'creator',
              select:'username profile.nickname profile.avatar',
              model: 'User'
          },{
              path: 'loves',
              select:'username profile.nickname profile.avatar',
              model: 'User'
          },
            {
                path: 'comments',model:'Comment',
                populate: [{
                    path: 'creator',
                    select:'username profile.nickname profile.avatar',
                    model: 'User'
                },{
                    path: 'loves',
                    select:'username profile.nickname profile.avatar',
                    model: 'User'
                }]
            },
          ]
      },
      {path:'userfrom', select:'username profile.nickname profile.avatar'},
  ]).exec((err,list)=>{
    if(!err && list.length > 0){
      socket.emit('serverpush_useralerttopiclist',{list});
    }
  });
};
exports.getuseralerttopic = getuseralerttopic;

exports.queryuserbalance = (socket,actiondata,ctx)=>{
  let userModel = DBModels.UserModel;
  userModel.findOne({_id:ctx.userid},(err,userEntity)=>{
    if(!err && !!userEntity){
      socket.emit('queryuserbalance_result', {balance:userEntity.balance});
    }
    else{
      console.log(`${JSON.stringify(err)},${JSON.stringify(userEntity)},id:${ctx.userid}`);
      socket.emit('common_err',{errmsg:'找不到该用户',type:'queryuserbalance'});
    }
  });
}

let userloginsuccess =(socket,ctx)=>{
  let dbModel = DBModels.DeviceModel;
  dbModel.find({creator:ctx.userid},(err,devicelist)=>{
    if(!err && devicelist.length > 0){
      _.map(devicelist,(device)=>{
        PubSub.subscribe(`device.${device.deviceid}`, ctx.userSubscriber);
      });
    }
  });

  dbModel = DBModels.TopicModel;
  dbModel.find({creator:ctx.userid},(err,topiclist)=>{
    if(!err && topiclist.length > 0){
      _.map(topiclist,(topic)=>{
        PubSub.subscribe(`topic.${topic._id}`, ctx.userSubscriber);
      });
    }
  });

  dbModel = DBModels.CommentModel;
  dbModel.find({creator:ctx.userid},(err,commentlist)=>{
    if(!err && commentlist.length > 0){
      _.map(commentlist,(comment)=>{
        PubSub.subscribe(`comment.${comment._id}`, ctx.userSubscriber);
      });
    }
  });

  getuseralerttopic(socket,ctx);

  //通知用户有订单更新
  PubSub.subscribe(`order.${ctx.userid}`, ctx.userSubscriber);

  shop.pushmycartcount(socket,ctx);
  address.pushdefaultaddress(socket,ctx);
  point.pushusermoney(socket,ctx);
}

let setloginsuccess = (socket,ctx,user)=>{
   ctx.userid = user._id;//for test only
  if(typeof ctx.userid === "string"){
    ctx.userid = mongoose.Types.ObjectId(ctx.userid);
  }
  ctx.userfrom= user.userfrom;
  ctx.userfrom2 = user.userfrom2;
  //login ok!
  console.log("login ok");
  let profile = {
    nickname:`游客${chance.string({length: 4,pool: '0123456789'})}`,
    avatar:'img/myprofile/1.png'
  };
  if(user.profile){
    profile = user.profile;
  }
  ctx.shield = profile['shield'] || [];
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + config.loginuserexptime,
    _id:user._id,
  },config.secretkey, {});
  socket.emit('users.login_result', {
    token: token,
    username: user.username,
    userid:user._id,
    profile,
    invitecode:user.invitecode,
    lastreadmsgtime_at:user.lastreadmsgtime_at,
    loginsuccess: true
  });

  let userModel =  DBModels.UserModel;
  userModel.findByIdAndUpdate(ctx.userid, {$set:
    {lasttoken:token}
  },{new: true},(err,result)=>{
      console.log(`findByIdAndUpdate===>ctx.userid:${ctx.userid},token:${token},err:${JSON.stringify(err)},result:${JSON.stringify(result)}`)
  });
  userloginsuccess(socket,ctx);
};
//https://www.npmjs.com/package/bcryptjs
//https://github.com/MiamiCoder/mobile-app-backend-mongodb-mongoose-1/blob/master/server/controllers/account.js
let globalUserauth = {};
exports.globalUserauth = globalUserauth;
let hashPassword = function (password, salt, callback) {
    // We use pbkdf2 to hash and iterate 10k times by default
    const iterations = 10000;
    const keyLen = 64; // 64 bit.
    console.log("password is :" + password);
   // password = new Buffer(password, 'binary');
    crypto.pbkdf2(password, salt, iterations, keyLen,'sha1', (err,result)=>{
      if(!err && result){
        callback(null,result.toString('hex'));
    }
    else{
        callback(err,null);
      }
    });
};

exports.fillprofile = (socket,actiondata,ctx)=> {
  // if (typeof actiondata.birthday === 'string') {
  //   actiondata.birthday = new Date(Date.parse(actiondata.birthday));
  // }

  let userModel =  DBModels.UserModel;
  userModel.findByIdAndUpdate(ctx.userid, {$set:{profile:actiondata.profile}}, {new: true}, (err, userEntity)=> {
    if (!err && userEntity) {
      ctx.shield = userEntity.profile['shield'] || [];
      socket.emit('fillprofile_result', {profile: userEntity.profile});
    }
  });
};

exports.findpwd = (socket,actiondata,ctx)=>{
  let newUser = actiondata;
  if(!globalUserauth.hasOwnProperty(newUser.username)){
    socket.emit('common_err',{errmsg:'请先发送验证码',type:'findpwd'});
    return;
  }
  if(globalUserauth[newUser.username].authcode != newUser.authcode){
    socket.emit('common_err',{errmsg:'验证码不对',type:'findpwd'});
    return;
  }
  let nowDate = new Date();
  let min2Ago = new Date(nowDate.getTime() - 1000 * config.authexptime);
  if(min2Ago > globalUserauth[newUser.username].updated_at){
    socket.emit('common_err',{errmsg:'验证码已过期',type:'findpwd'});
    return;
  }

  let dbModel = DBModels.UserModel;
  dbModel.findOne({ username: newUser.username }, (err, user)=> {
    if (err) {
      socket.emit('common_err',{errmsg:err.message,type:'findpwd'});
      return;
    }
    if (!user) {
      socket.emit('common_err',{errmsg:'用户不存在',type:'findpwd'});
      return;
    }
    let salt = uuid.v4();
    hashPassword(newUser.password,salt,(err,hashedpassword)=>{
      newUser.passwordhash = hashedpassword;
      newUser.passwordsalt = salt;
      newUser.updated_at = new Date();
      dbModel.findOneAndUpdate({_id:user._id},{$set:newUser},{new:true},(err,result)=>{
        if(!err && !!result){
          socket.emit('findpwd_result',{});
        }
        else{
          socket.emit('common_err',{errmsg:'找回密码失败',type:'findpwd'});
        }
      });
    });
  });

}

let doregisteruser = (socket,newUser,ctx,socketerrstring,callbackuserexits)=>{
   if(!globalUserauth.hasOwnProperty(newUser.username)){
    socket.emit(socketerrstring,{errmsg:'请先发送验证码'});
    return;
  }
  if(globalUserauth[newUser.username].authcode != newUser.authcode){
    socket.emit(socketerrstring,{errmsg:'验证码不对'});
    return;
  }
  let nowDate = new Date();
  let min2Ago = new Date(nowDate.getTime() - 1000 * config.authexptime);
  if(min2Ago > globalUserauth[newUser.username].updated_at){
    socket.emit(socketerrstring,{errmsg:'验证码已过期'});
    return;
  }

  let dbModel = DBModels.UserModel;
  dbModel.findOne({ username: newUser.username }, (err, user)=> {
    if (err) {
      socket.emit(socketerrstring,{errmsg:err.message});
      return;
    }
    if (user) {
      callbackuserexits(false,user);
      return;
    }
    let salt = uuid.v4();
    hashPassword(newUser.password,salt,(err,hashedpassword)=>{
      newUser.passwordhash = hashedpassword;
      newUser.passwordsalt = salt;
      newUser.created_at = new Date();
      newUser.updated_at = new Date();
      newUser.profile = {
        nickname:`游客${chance.string({length: 4,pool: '0123456789'})}`,
        avatar:'img/myprofile/1.png'
      };

      //昨天日期
      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      newUser.lastpointforsigndate = yesterday;

      let entity = new dbModel(newUser);
      entity.save((err, user, numberAffected) =>{
        if(err){
          return;
        }
        if (numberAffected === 1) {
          //Register OK
          console.log("Register ok");
          callbackuserexits(true,user);
        }
      });
    });
  });
}

let tryregisteruser = (socket,actiondata,ctx,newUser,socketerrstring,callback)=>{
  newUser.username = actiondata.username;
  newUser.authcode = actiondata.authcode;
  newUser.password = actiondata.password;
  if(actiondata.invitecode){
    let dbModel = DBModels.UserModel;
    dbModel.findOne({ invitecode: actiondata.invitecode }, (err, fromuser)=> {
      if(!err && fromuser){
         newUser.userfrom = fromuser._id;
         newUser.userfrom2 = fromuser.userfrom;
         newUser.invitecode = chance.string({length: 8,pool: '0123456789'});//8位数字邀请码
         doregisteruser(socket,newUser,ctx,socketerrstring,callback);//有邀请码用户
      }
      else{
         socket.emit(socketerrstring,{errmsg:'您输入的邀请码不正确'});
        return;
      }
    });

  }
  else{
    newUser.invitecode = chance.string({length: 8,pool: '0123456789'});//8位数字邀请码
    doregisteruser(socket,newUser,ctx,socketerrstring,callback);//无邀请码用户
  }
}

exports.registeruser = (socket,actiondata,ctx)=>{
  let newUser = {};
  tryregisteruser(socket,actiondata,ctx,newUser,'users.register_err',(isok,user)=>{
           if(isok){
              setloginsuccess(socket,ctx,user);
              socket.emit('users.register_result',{user});
           }
           else{
              socket.emit('users.register_err',{errmsg:'用户已存在'});
           }
  });

}

exports.loginuser = (socket,actiondata,ctx)=>{
  let oneUser = actiondata;
  let dbModel = DBModels.UserModel;
  dbModel.findOne({ username: oneUser.username }, (err, user)=> {
    if (!!err) {
      socket.emit('common_err',{errmsg:err.message,type:'login'});
      return;
    }
    if (!user) {
      socket.emit('common_err',{errmsg:'用户名或密码错误',type:'login'});
      return;
    }
    hashPassword(oneUser.password, user.passwordsalt, (err, passwordHash)=> {
      if (passwordHash == user.passwordhash) {
        setloginsuccess(socket,ctx,user);
      }
      else{
        socket.emit('common_err',{errmsg:'用户名或密码错误',type:'login'});
      }
    });
  });

}

exports.checkpassword = (userid,password,callback)=>{
  let dbModel = DBModels.UserModel;
  dbModel.findOne({ _id: userid }, (err, user)=> {
    if (!user) {
      callback(true,null);
      return;
    }
    hashPassword(password, user.passwordsalt, (err, passwordHash)=> {
      if (passwordHash == user.passwordhash) {
        callback(null,true);
      }
      else{
        callback(true,null);
      }
    });
  });

}


exports.loginwithauth = (socket,actiondata,ctx)=>{
    let userModel = DBModels.UserModel;
    if(!globalUserauth.hasOwnProperty(actiondata.phonenumber)){
        winston.getlog().error(`${actiondata.phonenumber}请先发送验证码`);
        socket.emit('common_err',{errmsg:'请先发送验证码',type:'loginwithauth'});
        return;
    }
    if(globalUserauth[actiondata.phonenumber].authcode !== actiondata.authcode) {
        winston.getlog().error(`验证码为:[${globalUserauth[actiondata.phonenumber].authcode}],发送过来[${actiondata.authcode}]`);
        socket.emit('common_err',{errmsg:'验证码不对',type:'loginwithauth'});
        return;
    }

    userModel.findOneAndUpdate({username:actiondata.phonenumber},{updated_at:new Date()},{new: true},(err,user)=> {
        if (!err && !!user) {
          setloginsuccess(socket,ctx,user);
        }
        else {
          winston.getlog().error(`${actiondata.phonenumber}登录失败${err.message}`);
          socket.emit('common_err', {errmsg: err.message,type:'loginwithauth'});
        }
    }); //userloginsuccess(socket,ctx,result);

}


exports.oauthbinduser = (socket,actiondata,ctx)=>{
  let newUser = {};
  if(actiondata.bindtype === 'qq'){
    newUser.openidqq = actiondata.openid;
  }
  else if(actiondata.bindtype === 'weixin'){
    newUser.openidweixin = actiondata.openid;
  }
  else{
    socket.emit('common_err',{errmsg:'不支持该类型绑定',type:'oauthbinduser'});
    return;
  }
  tryregisteruser(socket,actiondata,ctx,newUser,'oauthbinduser_err',(isok,user)=>{
      if(isok){
          setloginsuccess(socket,ctx,user);
          socket.emit('oauthbinduser_result',{});
       }
      else{
          hashPassword(actiondata.password, user.passwordsalt, (err, passwordHash)=> {
          //验证才能通过！
          if (passwordHash == user.passwordhash) {
              let  updateduserobj = {};
              if(actiondata.bindtype === 'qq'){
                updateduserobj.openidqq = actiondata.openid;
              }
              else if(actiondata.bindtype === 'weixin'){
                updateduserobj.openidweixin = actiondata.openid;
              }
              let userModel = DBModels.UserModel;
              userModel.findOneAndUpdate({_id:user._id}, {$set:updateduserobj},{new: true},(err,result)=>{
                if(!err && result){
                    setloginsuccess(socket,ctx,result);
                    socket.emit('oauthbinduser_result',{});
                }
              });
          }
          else{
            socket.emit('common_err',{errmsg:'密码不对',type:'oauthbinduser'});
          }
        });
       }
  });
}

exports.loginwithoauth = (socket,actiondata,ctx)=>{
  //actiondata:bindtype:'qq,weixin',openid:'xxx'
    let  queryuserobj = {};
    if(actiondata.bindtype === 'qq'){
      queryuserobj.openidqq = actiondata.openid;
      if(!queryuserobj.openidqq){
        socket.emit('common_err',{errmsg:'QQopenid不能为空',type:'login'});
        return;
      }
    }
    else if(actiondata.bindtype === 'weixin'){
      queryuserobj.openidweixin = actiondata.openid;
      if(!queryuserobj.openidweixin){
        socket.emit('common_err',{errmsg:'微信openid不能为空',type:'login'});
        return;
      }
    }
    else{
      socket.emit('common_err',{errmsg:'不支持该类型登录',type:'login'});
      return;
    }
    let userModel = DBModels.UserModel;
    userModel.findOneAndUpdate(queryuserobj, {updated_at:new Date()},{new: true},(err,result)=>{
      if(!err &&  !!result){
        setloginsuccess(socket,ctx,result);
      }
      else{
        socket.emit('loginwithoauth_result',actiondata);
        //socket.emit('login_err',{err:'找不到该用户'});
      }
    });
};

exports.loginwithtoken = (socket,actiondata,ctx)=>{
  try {
    let decodeduser = jwt.verify(actiondata.token, config.secretkey);
    let userid = decodeduser._id;
    let userModel = DBModels.UserModel;
    userModel.findByIdAndUpdate(userid, {updated_at:new Date()},{new: true},(err,result)=>{
    if(!err && result){
        if(result.lasttoken !== actiondata.token){
          console.log(`lasttoken:${result.lasttoken},curtoken:${actiondata.token}`);
          socket.emit('common_err',{errmsg:'您已经在另外一台设备登录,请重新登录',type:'login'});
          return;
        }
        setloginsuccess(socket,ctx,result);
    }
    else{
      socket.emit('common_err',{errmsg:'找不到该用户',type:'login'});
    }

  });

    //PubSub.publish(userid, {msg:'allriders',data:'bbbb',topic:'name'});
  } catch (e) {
    console.log("invalied token===>" + JSON.stringify(actiondata.token));
    console.log("invalied token===>" + JSON.stringify(e));
    socket.emit('common_err',{errmsg:e.message,type:'login'});
  }
}

exports.logout = (socket,actiondata,ctx)=>{
  console.log(`用户退出${ctx.userid}`);
  ctx.shield = [];
  let userModel = DBModels.UserModel;
  userModel.findByIdAndUpdate(ctx.userid, {
    $set:{
      'profile.shield':[]
    }
  },{new: true},(err,result)=>{
  });

  PubSub.unsubscribe( ctx.userSubscriber );
  delete ctx.userid;
  socket.emit('logout_result',{});
};

/*
userauth{
  username:{
    authcode:xxxx,
    updated_at:xxx
  }
}
}
*/
const sms = require('../smspush/sms.js');
let sendauthdo = (socket,actiondata,ctx)=>{
  let userAuth = actiondata;
  let nowDate = new Date();

  if(globalUserauth.hasOwnProperty(userAuth.username)){
    let minAgo = new Date(nowDate.getTime() - 1000 * 30);
    if(minAgo < globalUserauth[userAuth.username].updated_at){
      socket.emit('common_err',{errmsg:'请勿频繁发送验证码',type:'sendauth'});
      return;
    }

    let min2Ago = new Date(nowDate.getTime() - 1000 * config.authexptime);
    if(min2Ago > globalUserauth[userAuth.username].updated_at){
      //resend
      globalUserauth[userAuth.username].authcode = chance.string({length: 4,pool: '0123456789'});
      globalUserauth[userAuth.username].updated_at = nowDate;
    }
  }
  else{
    globalUserauth[userAuth.username] = {};
    globalUserauth[userAuth.username].authcode = chance.string({length: 4,pool: '0123456789'});
    globalUserauth[userAuth.username].updated_at = nowDate;
  }
  console.log(`${userAuth.username}验证码为:${globalUserauth[userAuth.username].authcode}`);
  sms.sendsmstouser(userAuth.username,userAuth.reason,globalUserauth[userAuth.username].authcode,
  (err,result)=>{
        if(!err){
            socket.emit('users.sendauth_result',result);
        }
        else{
            socket.emit('common_err',{type:'sendauth_result',errmsg:'发送验证码失败'});
        }
  });

};


exports.sendauth = (socket,actiondata,ctx)=>{
  const userModel = DBModels.UserModel;
  if(actiondata.reason === 'register' || actiondata.reason === 'findpwd'){
    userModel.findOne({username:actiondata.username},(err,user)=>{
      let errmsg = '发送验证码失败';
      if(!err){
        if(!!user && actiondata.reason === 'findpwd'){
          sendauthdo(socket,actiondata,ctx);
          return;
        }

        if(!user && actiondata.reason === 'register'){
          sendauthdo(socket,actiondata,ctx);
          return;
        }

        if(actiondata.reason === 'findpwd'){
          errmsg = '用户不存在';
        }
        if(actiondata.reason === 'register'){
          errmsg = '用户已存在';
        }
      }
      socket.emit('common_err',{type:'sendauth',errmsg});
    });
    return;
  }
  sendauthdo(socket,actiondata,ctx);
}

exports.setlastreadmsgtime= (socket,actiondata,ctx)=>{
  let userModel =  DBModels.UserModel;
  userModel.findByIdAndUpdate(ctx.userid, {$set:{lastreadmsgtime_at:new Date()}}, {new: true}, (err, userEntity)=> {
    if (!err && userEntity) {
      socket.emit('setlastreadmsgtime_result', {lastreadmsgtime_at: userEntity.lastreadmsgtime_at});
    }
  });
}
