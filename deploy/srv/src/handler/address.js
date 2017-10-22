let DBModels = require('../db/models.js');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../log/log.js');

exports.pushdefaultaddress = (socket,ctx)=>{
  dbModel = DBModels.UserModel;
  dbModel.findOne({_id:ctx.userid}).populate([
        {path:'defaultaddress', model: 'Address'},
  ]).exec((err,result)=>{
        //winston.getlog().info('推送给默认地址:'+ JSON.stringify(result));
        if(!err && result){
            socket.emit('serverpush_defaultaddress',result.defaultaddress);
        }
    });
}
// (node:7896) DeprecationWarning: Mongoose: mpromise (mongoose's default promise l
// ibrary) is deprecated, plug in your own promise library instead: http://mongoose
// js.com/docs/promises.html

exports.createaddress = (socket,payloaddata,ctx)=>{
  let entitydata = payloaddata;
  entitydata.creator = ctx.userid;
  entitydata.created_at = new Date();

  let dbModel = DBModels.AddressModel;
  let entity = new dbModel(entitydata);
  entity.save((err,newaddress)=>{
    if(!err && newaddress){
      if(newaddress){
        socket.emit('address.createaddress_result',{newaddress});
        
        if(payloaddata.isdefaultaddress){
          let userModel  = DBModels.UserModel;
          userModel.findOneAndUpdate({_id:ctx.userid},{$set:{defaultaddress:newaddress._id}},{new:true},(err,result)=>{
                if(!err && result){
                  socket.emit('serverpush_defaultaddress',newaddress);
                }
          });
        }
      }
    }
    else{
      socket.emit('common_err',{type:'createaddress',errmsg:`新建地址失败:${err.message}`});
      //winston.getlog().error(`新建地址失败:${err.message}`);
    }
  });


}


//populate
exports.getaddresslist  = (socket,payloaddata,ctx)=>{
  let dbModel = DBModels.AddressModel;
  payloaddata.query.creator = ctx.userid;
  dbModel.paginate(payloaddata.query,payloaddata.options,(err,myaddresslist)=>{
    if(!err){
      socket.emit('address.getaddresslist_result',{myaddresslist});
    }
    else{
      socket.emit('common_err',{type:'getaddresslist',errmsg:`获取我的地址失败:${err.message}`});
      //winston.getlog().error(`获取我的地址失败:${err.message}`);
    }
  });
}


exports.deleteaddress = (socket,payloaddata,ctx)=>{
  let dbModel = DBModels.AddressModel;
  dbModel.findOneAndRemove({
        _id: payloaddata._id
    }, (err, result)=> {
      console.log("DELETE err=>" + JSON.stringify(err));
      console.log("DELETE result=>" + JSON.stringify(result));
      if(!err){
        socket.emit('address.deleteaddress_result',{_id:payloaddata._id});
      }
      else{
        socket.emit('common_err',{type:'deleteaddress',errmsg:'删除地址失败'});
      }
    });
}

exports.editaddress = (socket,payloaddata,ctx)=>{
  //获取所有帖子列表
  let dbModel = DBModels.AddressModel;
  dbModel.findOneAndUpdate({
        _id: payloaddata._id
    },payloaddata,{new: true}, (err, editedaddress)=> {

      if(!err && editedaddress){
        socket.emit('address.editaddress_result',{editedaddress});
        if(payloaddata.isdefaultaddress){
          let userModel = DBModels.UserModel;
          userModel.findOneAndUpdate({_id:ctx.userid},{$set:{defaultaddress:editedaddress._id}},{new: true},(err,result)=>{
                if(!err && result){
                  socket.emit('serverpush_defaultaddress',editedaddress);
                }
          });
        }
      }
      else{
        socket.emit('common_err',{type:'editaddress',errmsg:'编辑地址失败'});
      }
    });
}
