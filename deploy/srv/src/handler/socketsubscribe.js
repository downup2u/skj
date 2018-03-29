const winston = require('../log/log.js');
const DBModels = require('../db/models.js');
const PubSub = require('pubsub-js');
/*
topic:notifymessage
topic:topic.id + data
topic:comment.id + data
*/

// 回复自己帖子？
// 点赞自己帖子?
// 或者回复自己评论？
// 点赞自己评论?
//publish:自己帖子id,自己帖子评论id
// let UserAlertTopicSchema = new Schema({
//     creator:{ type: Schema.Types.ObjectId, ref: 'User' },
//     type:String,//topiclove,topiccomment,commentlove,commentcomment,
//     topicself:{ type: Schema.Types.ObjectId, ref: 'Topic' },
//     commentself:{ type: Schema.Types.ObjectId, ref: 'Comment' },
//     comment:{ type: Schema.Types.ObjectId, ref: 'Comment' },
//     userfrom:{ type: Schema.Types.ObjectId, ref: 'User' },
//     created_at: Date,
// });
const pushdatatouser_product = (socket)=>{
  const dbModel = DBModels.ProductModel;
  dbModel.find({isenabled:true},(err,list)=>{
    if(!err){
        socket.emit('shop.getproduct_result',{list});
    }
    else{
      socket.emit('common_err',{type:'getproduct',errmsg:`获取产品列表失败:${err.message}`});
        //winston.getlog().error(`获取产品列表失败：${err.message}`);
    }
  });
}

let pushdatatouser_useralerttopic = (socket,useralerttopic)=>{
    dbModel = DBModels.UserAlertTopicModel;
    dbModel.findOne({_id:useralerttopic._id}).populate([
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
    ]).exec((err,result)=>{
        //winston.getlog().info('推送给用户提醒数据:'+ JSON.stringify(result));
        if(!err && result){
            socket.emit('serverpush_useralerttopic',result);
        }
    });
}

// let pushdatatouser_order = (socket,orderdata)=>{
//
//     socket.emit('serverpush_orderinfo',orderdata);
// }

exports.usersubfn  = (socket,ctx)=>{
  ctx.userSubscriber = ( msg, data )=>{
      //winston.getlog().info('用户订阅请求,用户信息:'+JSON.stringify(ctx));
      //winston.getlog().info('用户订阅消息:'+msg);
      //winston.getlog().info('用户订阅数据:'+data);
      let topicsz = msg.split('.');
      if(topicsz.length > 0 && topicsz[0] === 'product'){
          pushdatatouser_product(socket);
          return;
      }
      if(topicsz.length === 2 && topicsz[0] === 'topic'){
          pushdatatouser_useralerttopic(socket,data);
          return;
      }
      else if(topicsz.length === 2 && topicsz[0] === 'comment'){
          pushdatatouser_useralerttopic(socket,data);
          return;
      }
      else if(topicsz.length === 2 && topicsz[0] === 'order'){
          //order.用户id
          //pushdatatouser_order(socket,data.orderdata);
          let eventobj = data;
          socket.emit(eventobj.cmd,eventobj.data);
          return;
      }
      else if(topicsz.length === 2 && topicsz[0] === 'device'){
          //order.用户id
          //pushdatatouser_order(socket,data.orderdata);
          let dbModel = DBModels.DeviceModel;
          let deviceid = topicsz[1];
          console.log(`开始推送设备数据${deviceid}给${ctx.userid}`);
          dbModel.findOne({deviceid:deviceid}).populate([
            {
              path:'realtimedata', model: 'Realtimedata'
            }
            ]).exec((err,result)=>{
            if(!err && !!result){
              socket.emit('serverpush_devicedata',result);
            }
          });
          return;
      }
  };//for eachuser

  PubSub.subscribe(`product`, ctx.userSubscriber);
};
