let DBModels = require('../../db/models.js');
const config = require('../../../config.js');
let winston = require('../../log/log.js');

let pushmycartcount = (socket,ctx)=>{
    let dbModel = DBModels.MycartModel;
    dbModel.aggregate([
       {$match: {creator:ctx.userid}},
       {$group: {
        _id: '$creator',
        totalnumbers: { $sum: "$number" }
       }
    }],
    (err, result)=> {
      if(!err){//[{"_id":"58d6ae16e9eeb16b217bba0c","totalnumbers":214}]
          console.log('pushmycartcount==>' + JSON.stringify(result));
          if(result){
            if(result.length === 1){
                console.log('pushmycartcount==>totalnumbers' + result[0].totalnumbers);
                socket.emit('serverpush_mycartcount',result[0].totalnumbers);
                return;
            }
          }//考虑没数据的情况
          socket.emit('serverpush_mycartcount',0);
      }
      else{
        socket.emit('common_err',{type:'serverpush_mycartcount',errmsg: `获取购物车个数失败${err.message}`});
      }

    });
}
exports.pushmycartcount = pushmycartcount;
//修改购物车
let mycartupinsertone = (socket,payloaddata,ctx,resultstring)=>{
  let dbModel = DBModels.MycartModel;
  dbModel.findOneAndUpdate({
        _id: payloaddata._id
    },payloaddata.data,  {new: true},(err, updateditem)=> {
      console.log('err:' + JSON.stringify(err));
      console.log('updateditem:' + JSON.stringify(updateditem));
      if(!err) {
        if(updateditem){
          socket.emit(resultstring,{updateditem});
          pushmycartcount(socket,ctx);
          return;
        }
      }
     else {
        socket.emit('common_err',{type:resultstring,errmsg: `修改我的购物车失败${err.message}`});
        //winston.getlog().error(`修改我的购物车:${err.message}`);
      }
    });
}

exports.mycartupdateone =  (socket,payloaddata,ctx)=>{
  mycartupinsertone(socket,payloaddata,ctx,'shop.mycartupdateone_result');
}
//如果存在则叠加，如果不存在则插入
exports.mycartaddone = (socket,payloaddata,ctx)=>{
  let entitydata = payloaddata;
  entitydata.creator = ctx.userid;

  let dbModel = DBModels.MycartModel;
  dbModel.findOne({
    creator:ctx.userid,
    product:payloaddata.product
  }, function(err, oldcart) {
    if(!err){
      if(oldcart){
         entitydata.number += oldcart.number;
         mycartupinsertone(socket,{
           _id:oldcart._id,
           data:entitydata
         },ctx,'shop.mycartaddone_result');
      }
      else{
        entitydata.created_at = new Date();
        let entity = new dbModel(entitydata);
        entity.save((err,newitem)=>{
          if(!err && newitem){
            socket.emit('shop.mycartaddone_result',{newitem});
            pushmycartcount(socket,ctx);
            return;
          }
          socket.emit('common_err',{type:'mycartaddone',errmsg:`插入我的购物车失败`});
        });
      }
    }
  });
}

//删除一条购物车记录
exports.mycartdelone = (socket,payloaddata,ctx)=>{
  let dbModel = DBModels.MycartModel;
  dbModel.findOneAndRemove({
        _id: payloaddata._id
    }, (err, result)=> {
     if(!err){
        socket.emit('shop.mycartdelone_result',{_id:payloaddata._id});
        pushmycartcount(socket,ctx);
      }
      else{
        socket.emit('common_err',{type:'mycartdelone',errmsg:`删除我的购物车失败:${err.message}`});
        //winston.getlog().error(`删除我的购物车失败:${err.message}`);
      }
    });
}



//获取购物车记录
exports.mycartgetall = (socket,payloaddata,ctx)=>{
  let dbModel = DBModels.MycartModel;
  payloaddata.query.creator = ctx.userid;
  dbModel.paginate(payloaddata.query,payloaddata.options,(err,list)=>{
    if(!err){
      socket.emit('shop.mycartgetall_result',{result:list});
    }
    else{
      socket.emit('common_err',{type:'mycartgetall',errmsg:`获取我的购物车失败:${err.message}`});
      //winston.getlog().error(`获取我的购物车失败:${err.message}`);
    }
  });
}
