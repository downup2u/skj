let DBModels = require('../../db/models.js');
const config = require('../../../config.js');
let winston = require('../../log/log.js');
const async = require('async');
const _ = require('lodash');
//邀请码处理逻辑(待测试),8位邀请码不重复
// exports.doinvitecode = (registereduserid,invitecode)=>{
//     //搜用户表的invitecode
//       let userModel = DBModels.UserModel;
//       userModel.findOne({invitecode:invitecode},(err,userfrom)=>{
//         if(!err && userfrom){
//             if(userfrom.userfrom){
//                 let userfrom2 = userfrom.userfrom;
//                 userModel.findOneAndUpdate({_id:registereduserid},{userfrom,userfrom2});
//             }
//             else{
//                 userModel.findOneAndUpdate({_id:registereduserid},{userfrom});
//             }
//         }
//       });
// }

//获取分销用户个数<---app接口
exports.getnextusers = (socket,payloaddata,ctx)=>{
  let fngetuserlevel1 = ((callbackfn)=>{
      let userModel = DBModels.UserModel;
      userModel.count({userfrom:ctx.userid},(err,result)=>{
        callbackfn(err,result);
      });
  });
  let fngetuserlevel2 = ((callbackfn)=>{
      let userModel = DBModels.UserModel;
      userModel.count({userfrom2:ctx.userid},(err,result)=>{
        callbackfn(err,result);
      });
  });

  let asyncfnsz = [fngetuserlevel1,fngetuserlevel2];
  async.parallel(asyncfnsz,(err,result)=>{
    if(!err){
      let level1 = result[0];
      let level2 = result[1];
      socket.emit('shop.getnextusers_result',{level1,level2});
    }
    else{
        socket.emit('common_err',{type:'getnextusers',errmsg:`获取分销用户个数失败`});
    }
  });
}

//获取用户订单统计（一级／二级数据全部返回） 下线
//统计RechargerecordSchema中creator为自己,srctype为订单,levelflag为1,2的feebonus金额总和
exports.getdistsalesorderstat = (socket,payloaddata,ctx)=>{
       let dbModel = DBModels.RechargerecordModel;
       dbModel.aggregate([
            {$match: {creator:ctx.userid,srctype:'order'}},
            {$group: { 
                _id: '$levelflag', 
                totalorders:{ $sum: 1 },
                totalfeebonus: { $sum: "$feebonus" } 
            } 
            }],
            (err, list)=> {
                if(!err){
                    socket.emit('shop.getdistsalesorderstat_result',{list});
                }
                else{
                    socket.emit('common_err',{type:'getdistsalesorderstat',errmsg:`获取用户订单统计失败`});
                }
            
        });
}

//对应页面（我的分销）,希望一条语句查询所有
//需要数据测试：http://stackoverflow.com/questions/16680015/how-to-use-populate-and-aggregate-in-same-statement
//搜：aggregate group populate $lookup
//一级／二级代理 姓名 订单总额 奖励金额(注意：需要考虑到用户必须满)
exports.getdistsalesorders = (socket,payloaddata,ctx)=>{

    let fngetuser1 = (callbackfn)=>{
            dbModel = DBModels.UserModel;
            dbModel.find({userfrom:ctx.userid}).populate([
                    {path:'userfrom', select:'_id username profile.nickname profile.avatar', model: 'User'},
            ]).exec((err,list)=>{
                callbackfn(null,list);
            });
    };
    let fngetuser2 = (callbackfn)=>{
            dbModel = DBModels.UserModel;
            dbModel.find({userfrom2:ctx.userid}).populate([
                    {path:'userfrom2', select:'_id username profile.nickname profile.avatar', model: 'User'},
            ]).exec((err,list)=>{
                    callbackfn(null,list);
            });
    };
    let fngetdata = (callbackfn)=>{
      let dbModel = DBModels.RechargerecordModel;
       dbModel.aggregate([
            {$match: {creator:ctx.userid,srctype:{ $in: ['order','withdrawcash']}}},
            {$group: { 
                _id:'$fromuser', 
                levelflag:{$first:'$levelflag'},
                totalorderprices: { $sum: "$orderprice" },
                totalfeebonus: { $sum: "$feebonus" } 
            }},
            {$lookup: {from: 'users', localField: '_id', foreignField: '_id', as: 'fromuserobj'} },
            {$project: {fromuserprofile:"$fromuserobj.profile",phonenumber:"$fromuserobj.username",levelflag:true,totalorderprices:true,totalfeebonus:true}},
           ],
            (err, list)=> {
                console.log('list:' + JSON.stringify(list));
                if(!err && list){
                    callbackfn(null,list);
                }
                else{
                    callbackfn(null,[]);
                }
            
        });
    };

    let asyncfnsz = [fngetuser1,fngetuser2,fngetdata];
    async.parallel(asyncfnsz,(err,result)=>{
        if(!err){
            let level1list = result[0];
            let level2list = result[1];
            let datalist = result[2];

            let level1users = {};
            let level2users = {};

            _.map(level1list,(user)=>{
                level1users[user._id]  = {
                    username:user.username,
                    nickname:user.profile.nickname,
                    avatar:user.profile.avatar,
                    totalorderprices:0,
                    totalfeebonus:0
                }
            });
            
             _.map(level2list,(user)=>{
                level2users[user._id]  = {
                    username:user.username,
                    nickname:user.profile.nickname,
                    avatar:user.profile.avatar,
                    totalorderprices:0,
                    totalfeebonus:0
                }
            });
          //[{"_id":"58ef3c3a80703c2e7a144339","levelflag":1,"totalorderprices":300,"totalfeebonus":30,"fromuserprofile":[{"avatar":"img/myprofile/1.png","nickname":"游客0130"}],"phonenumber":["15961123513"]},{"_id":"58ef3c8380703c2e7a14433a","levelflag":2,"totalorderprices":30,"totalfeebonus":1.5,"fromuserprofile":[{"avatar":"img/myprofile/1.png","nickname":"游客8859"}],"phonenumber":["13861174733"]}]
             _.map(datalist,(userdata)=>{
                 if(userdata.levelflag === 1){
                    level1users[userdata._id]  = {
                        username:userdata.phonenumber,
                        nickname:userdata.fromuserprofile.nickname,
                        avatar:userdata.fromuserprofile.avatar,
                        totalorderprices:userdata.totalorderprices,
                        totalfeebonus:userdata.totalfeebonus,
                    };
                 }
                 else if(userdata.levelflag === 2){
                    level2users[userdata._id]  = {
                        username:userdata.phonenumber,
                        nickname:userdata.fromuserprofile.nickname,
                        avatar:userdata.fromuserprofile.avatar,
                        totalorderprices:userdata.totalorderprices,
                        totalfeebonus:userdata.totalfeebonus,
                    };
                 }
            });
            socket.emit('shop.getdistsalesorders_result',{level1users,level2users});
            console.log('getdistsalesorders---->' + JSON.stringify({level1users,level2users}));
        }
        else{
            socket.emit('common_err',{type:'getdistsalesorders',errmsg:`获取我的分销失败`});
        }
    });
 
}

//获取订单明细
exports.getdistsalesorderdetails = (socket,payloaddata,ctx)=>{
       let dbModel = DBModels.RechargerecordModel;
        payloaddata.query.creator = ctx.userid;
        dbModel.paginate(payloaddata.query,payloaddata.options,(err,list)=>{
            if(!err){
                socket.emit('shop.getdistsalesorderdetails_result',{result:list});
            }
            else{
                socket.emit('common_err',{type:'getdistsalesorderdetails',errmsg:`获取订单明细失败:${err.message}`});
                //winston.getlog().error(`获取订单明细失败:${err.message}`);
            }
        });
}