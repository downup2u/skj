let DBModels = require('../../db/models.js');
const config = require('../../../config.js');
let winston = require('../../log/log.js');
const moment = require('moment');
const async = require('async');

//插入一条新增积分纪录
//pointrecord格式：分值,reason,pointbonus
let addpointrecord =(pointrecord,userid,callback)=>{
     let userModel = DBModels.UserModel;
     userModel.findOne({_id:userid},(err,targetuser)=>{
         if(!err && targetuser){
            let pointold = targetuser.point;
            let pointbonus = pointrecord.pointbonus;//应付金额
            let pointnew = parseFloat((pointold + pointbonus).toFixed(2));
            let pointrecordModel =  DBModels.PointrecordModel;
            let entityuser = new pointrecordModel({
                    creator:targetuser._id,
                    pointold,
                    pointnew,
                    pointbonus,
                    reason:pointrecord.reason,
                    created_at:new Date(),
                    getdate:moment().format('YYYY-MM-DD')
             });
             entityuser.save((err,newpointrecord)=>{//保存该用户2值记录
                  if(!err && newpointrecord){
                      //该用户充值记录
                      let updatedata = {
                        point:pointnew
                      };
                      if(pointrecord.reason === '签到'){
                        updatedata.lastpointforsigndate = new Date();
                      }
                    userModel.findOneAndUpdate({_id:newpointrecord.creator},{$set:updatedata},{new:true},(err,result)=>{
                    //更新用户余额
                        if(!err && result){
                              callback(null,newpointrecord);
                        }
                        else{////更新用户余额
                          callback('更新用户积分记录失败');
                        }
                    });
                }
                else{//保存该用户2值记录
                  callback('保存用户积分记录失败');
                }
             });
         }
         else{// userModel.findOne({_id:ctx.creator},(err,targetuser)=>{
            callback('找不到该用户');
         }
     });

}
exports.addpointrecord = addpointrecord;
//推送用户余额
let pushusermoneym=(userid,fncallback)=>{
  let dbModel = DBModels.UserModel;
  dbModel.findOne({_id:userid},(err,result)=>{
        //winston.getlog().info('推送用户余额:'+ JSON.stringify(result));
        if(!err && result){
            fncallback({
              cmd:'serverpush_usermoney',
              data:{
                  balance:result.balance,
                  point:result.point
              }
            });
        }
  });
}

let pushusermoney = (socket,ctx)=>{
  pushusermoneym(ctx.userid,(eventobj)=>{
    socket.emit(eventobj.cmd,eventobj.data);
  });
}

exports.pushusermoneym = pushusermoneym;
exports.pushusermoney = pushusermoney;
//获取用户余额
exports.getusermoney  = (socket,payloaddata,ctx)=>{
    pushusermoney(socket,ctx);
};

//今日是否签到
let isusergetpointsigntoday=(ctx,callback)=>{
  let isusergetpointsigntoday = true;
  dbModel = DBModels.UserModel;
  dbModel.findOne({_id:ctx.userid},(err,result)=>{
        if(!err && result){
          let today = moment().format('YYYY-MM-DD');
          let lastshared = result.lastpointforsigndate;
          if(lastshared){
            let lastsharedday = moment(lastshared).format('YYYY-MM-DD');
            if(lastsharedday === today){
              isusergetpointsigntoday = true;
            }
            else{
              isusergetpointsigntoday = false;
            }
          }
          else{
            isusergetpointsigntoday = false;
          }
        }
       callback(isusergetpointsigntoday);
  });
}

exports.getusergetpointsigntoday  = (socket,payloaddata,ctx)=>{
    isusergetpointsigntoday(ctx,(result)=>{
      socket.emit('shop.getusergetpointsigntoday_result',result);
    });
};


//reason:签到／分享
exports.useraddpoint = (socket,payloaddata,ctx)=>{
  let dbModel = DBModels.PointModel;
  let fn1 = (callbackfn)=>{
       let dbModel = DBModels.SystemConfigModel;
       dbModel.findOne({},(err,systemconfig)=>{
            callbackfn(err,systemconfig);
       });
  };
  if(payloaddata.reason === '签到'){
    //获取用户信息（今日是否签到过）
    let fn2 = (callbackfn)=>{
      isusergetpointsigntoday(ctx,(isusergetpointsigntoday)=>{
        callbackfn(null,isusergetpointsigntoday);
      });
    };
    let asyncfnsz = [fn1,fn2];
      async.parallel(asyncfnsz,(err,result)=>{
        if(!err){
          let systemconfig = result[0] || {getpointfromsign:10};
          let isusergetpointsigntoday = result[1];
          console.log('async.parallel result===>' + JSON.stringify(result));
          console.log('systemconfig===>' + JSON.stringify(systemconfig));
          console.log('isusergetpointsigntoday===>' + isusergetpointsigntoday);
          //分享获积分,判断是否满足条件
          if(!isusergetpointsigntoday){
            addpointrecord({
              reason:'签到',
              pointbonus:systemconfig.getpointfromsign
            },ctx.userid,(err,result)=>{
              //<---------------
              console.log('addpointrecord===>' + JSON.stringify(err));
              console.log('addpointrecord===>' + JSON.stringify(result));
              if(!err){
                socket.emit('useraddpoint_result',{result});
              }
              else{
                socket.emit('useraddpoint_result',{err});
              }

              pushusermoney(socket,ctx);
            });
          }
          else{
            console.log('今天已经签到过了');
            socket.emit('useraddpoint_result',{err:'今天已经签到过了'});
          }
        }
      });
  }
  else if(payloaddata.reason === '分享'){
    //获取system信息【limit】
    //获取今日统计信息(通过分享获得多少积分了)
      let fn2 = (callbackfn)=>{
          let dbModel = DBModels.PointrecordModel;
          dbModel.aggregate([
                {$match: {creator:ctx.userid,reason:'分享',getdate:moment().format('YYYY-MM-DD')}},
                {$group: {
                    _id: '$creator',
                    totalpoints: { $sum: "$pointbonus" }
                }
                }],
                (err, list)=> {
                    callbackfn(err,list);
            });
      };
      let asyncfnsz = [fn1,fn2];
      async.parallel(asyncfnsz,(err,result)=>{
        if(!err){
          let systemconfig = result[0];
          let totalpointslist = result[1];
          console.log('systemconfig===>' + JSON.stringify(systemconfig));
          console.log('totalpointslist===>' + JSON.stringify(totalpointslist));
          let totalpoints = 0;
          if(totalpointslist.length === 1){
             totalpoints = totalpointslist[0].totalpoints;
          }

          if(totalpoints + systemconfig.getpointfromshare <=  systemconfig.pointlimitshare){
                //分享获积分,判断是否满足条件
                addpointrecord({
                    reason:'分享',
                    pointbonus:systemconfig.getpointfromshare
                  },ctx.userid,(err,result)=>{
                    //<---------------
                    console.log('addpointrecord===>' + JSON.stringify(err));
                    console.log('addpointrecord===>' + JSON.stringify(result));
                    if(!err){
                      socket.emit('useraddpoint_result',{result});
                    }
                    else{
                      socket.emit('useraddpoint_result',{err});
                    }
                    pushusermoney(socket,ctx);
                  });
          }
          else{
            socket.emit('useraddpoint_result',{err:`超过最大积分${systemconfig.pointlimitshare},今日已获取${totalpoints}了`});
            console.log(`超过最大积分${systemconfig.pointlimitshare},今日已获取${totalpoints}了,本次分享得分：${systemconfig.getpointfromshare}`)
          }
        }

      });

 }

  //统计下给用户今天得了多少积分,如果大于设定的值,则返回已超过上限
  //如果未到上限,则插入,并更新用户表，推送给客户新值
}

//获取积分明细
exports.getuserpointdetails = (socket,payloaddata,ctx)=>{
       let dbModel = DBModels.PointrecordModel;
        payloaddata.query.creator = ctx.userid;
        dbModel.paginate(payloaddata.query,payloaddata.options,(err,list)=>{
            if(!err){
                socket.emit('shop.getuserpointdetails_result',{result:list});
            }
            else{
              socket.emit('common_err',{type:'getuserpointdetails',errmsg:`获取积分明细:${err.message}`});
              //winston.getlog().error(`获取积分明细失败:${err.message}`);
            }
        });
}
