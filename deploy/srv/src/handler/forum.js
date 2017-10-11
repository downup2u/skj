let DBModels = require('../db/models.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../log/log.js');
const userlogin = require('./userlogin');

exports.setuseralerttopicreaded  = (socket,payloadata,ctx)=> {
  //更新状态为已读
  let dbModel = DBModels.UserAlertTopicModel;
  dbModel.findOneAndUpdate({
    _id: payloadata
  },{ $set: { "isreaded": true } }, {new: true}, (err, result)=> {
    console.log("setuseralerttopicreaded===>" + JSON.stringify(result));
    if(!err && result){
      socket.emit('setuseralerttopicreaded_result',result);
    }
  });
}

exports.setuseralerttopicdeleted  = (socket,payloadata,ctx)=> {
  //从数据库中删除
  let dbModel = DBModels.UserAlertTopicModel;
  dbModel.findOneAndRemove({
    _id: payloadata
  }, (err, result)=> {
    console.log("setuseralerttopicdeleted===>" + JSON.stringify(result));
    if(!err && !!result){
      socket.emit('setuseralerttopicdeleted_result',result);
    }
    userlogin.getuseralerttopic(socket,ctx);
  });
}

exports.getmytopic  = (socket,payloadata,ctx)=>{
  //获取我发表的帖子列表
  let dbModel = DBModels.TopicModel;
  payloadata.query.creator = ctx.userid;
  payloadata.query.isvisiable = true;
  //populate:"creator comments"
  payloadata.options.populate =   [
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
  ];
  dbModel.paginate(payloadata.query,payloadata.options,(err,list)=>{
    if(!err){
      socket.emit('forum.getmytopic_result',{result:list});
    }
  });
}

exports.inserttopic = (socket,payloadata,ctx)=>{
  //插入帖子
  let entitydata = payloadata;
  entitydata.creator = ctx.userid;
  entitydata.created_at = new Date();

  let dbModel = DBModels.TopicModel;
  let entity = new dbModel(entitydata);
  entity.save((err,newtopic)=>{
    if(!err){
      socket.emit('forum.inserttopic_result',{newtopic});
      PubSub.subscribe(`topic.${newtopic._id}`, ctx.userSubscriber);
    }
  });

}

let checkistopicloved = (socket,payloadata,ctx,fn)=>{
  //判断该主题是否被自己点赞过
  //PersonModel.find({ favouriteFoods: "sushi" }, ...);
  let dbTopicModel = DBModels.TopicModel;
  let loveuserid = ctx.userid;
  dbTopicModel.findOne({ "_id": payloadata.topicid,loves: loveuserid },(err,result)=>{
    if(!err && result){
      console.log(`帖子${payloadata.topicid}已被${loveuserid}点赞过`);
      fn(true);
    }
    else{
      console.log(`帖子${payloadata.topicid}未被${loveuserid}点赞过`);
      fn(false);
    }
  });

}
//主题点赞
exports.lovetopicadd = (socket,payloadata,ctx)=>{
  checkistopicloved(socket,payloadata,ctx,(isloved)=>{
    if(isloved){
      return;
    }

    let dbTopicModel = DBModels.TopicModel;
    let loveuserid = ctx.userid;
    dbTopicModel.findOneAndUpdate({ "_id": payloadata.topicid },{ "$push": { "loves": loveuserid } }, {new: true},(err,updatedtopic)=>{
      console.log("lovetopicadd newtopic===>" + JSON.stringify(updatedtopic));
      socket.emit('forum.lovetopicadd_result',{updatedtopic});

      //-----------主题点赞-----------
      if(updatedtopic.createor.toString() !== ctx.userid.toString()){
        let useralerttopic = {
          creator:updatedtopic.creator,
          type:'topiclove',
          topicself:updatedtopic._id,
          userfrom:ctx.userid,
          created_at:new Date(),
        };
        let dbModel = DBModels.UserAlertTopicModel;
        let entity = new dbModel(useralerttopic);
        entity.save((err,useralerttopicnew)=>{
          if(!err){
            //socket.emit('serverpush_useralerttopic',useralerttopicnew);
            PubSub.publish(`topic.${updatedtopic._id}`,useralerttopicnew);
          }
        });
      }
      //-----------主题点赞-----------
    });
  });
}
//主题取消点赞
exports.lovetopicunadd = (socket,payloadata,ctx)=>{
  let dbTopicModel = DBModels.TopicModel;
  let loveuserid = ctx.userid;
  dbTopicModel.findOneAndUpdate({ "_id": payloadata.topicid },{ "$pull": { "loves": loveuserid } }, {new: true},(err,updatedtopic)=>{
    console.log("lovetopicunadd updatedtopic===>" + JSON.stringify(updatedtopic));
    socket.emit('forum.lovetopicunadd_result',{updatedtopic});
  });

}
//评论点赞

let checkiscommentloved = (socket,payloadata,ctx,fn)=>{
  //判断该评论是否被自己点赞过
  //PersonModel.find({ favouriteFoods: "sushi" }, ...);
    let dbModel = DBModels.CommentModel;
    let loveuserid = ctx.userid;
    dbModel.findOne({ "_id": payloadata.commentid,loves: loveuserid },(err,result)=>{
      if(!err && result){
        console.log(`评论${payloadata.commentid}已被${loveuserid}点赞过`);
        fn(true);
      }
      else{
        console.log(`评论${payloadata.commentid}未被${loveuserid}点赞过`);
        fn(false);
      }
  });
}

exports.lovecommentsadd = (socket,payloadata,ctx)=>{
  checkiscommentloved(socket,payloadata,ctx,(isloved)=>{
    if(isloved){
      return;
    }
    let dbModel = DBModels.CommentModel;
    let loveuserid = ctx.userid;
    dbModel.findOneAndUpdate({ "_id": payloadata.commentid },{ "$push": { "loves": loveuserid } }, {new: true},(err,updatedcomment)=>{
      console.log("lovecommentsadd updatedcomment===>" + JSON.stringify(updatedcomment));
      socket.emit('forum.lovecommentsadd_result',{updatedcomment});

    //-----------评论点赞-----------

      if(updatedcomment.creator.toString() !== ctx.userid.toString()){
        console.log(`${updatedcomment.creator}??${ctx.userid}`);
        let useralerttopic = {
          creator:updatedcomment.creator,
          type:'commentlove',
          topicself:payloadata.topicid,
          commentself:updatedcomment._id,
          userfrom:ctx.userid,
          created_at:new Date(),
        };
        let dbModel = DBModels.UserAlertTopicModel;
        let entity = new dbModel(useralerttopic);
        entity.save((err,useralerttopicnew)=>{
          if(!err){
            //socket.emit('serverpush_useralerttopic',useralerttopicnew);
            PubSub.publish(`comment.${updatedcomment._id}`,useralerttopicnew);
          }
        });
      }
      //-----------评论点赞-----------
    });
  });
}
//评论取消点赞
exports.lovecommentsunadd = (socket,payloadata,ctx)=>{
  let dbModel = DBModels.CommentModel;
  let loveuserid = ctx.userid;
  dbModel.findOneAndUpdate({ "_id": payloadata.commentid },{ "$pull": { "loves": loveuserid } }, {new: true},(err,updatedcomment)=>{
    console.log("lovecommentsunadd updatedcomment===>" + JSON.stringify(updatedcomment));
    socket.emit('forum.lovecommentsunadd_result',{updatedcomment});
  });
}

exports.insertcommentstotopic = (socket,payloadata,ctx)=>{
  //帖子上插入评论
  let entitydata = payloadata.comment;
  entitydata.creator = ctx.userid;
  entitydata.created_at = new Date();

  let dbModel = DBModels.CommentModel;
  let entity = new dbModel(entitydata);
  entity.save((err,newcomments)=>{
    if(!err){
      socket.emit('forum.insertcommentstotopic_result',{newcomments});
      //push to topic
      console.log("insertcommentstotopic newcomments===>" + JSON.stringify(newcomments));

      let commentsid = newcomments._id;
      if(typeof commentsid === "string"){
        commentsid = mongoose.Types.ObjectId(commentsid);
      }
      PubSub.subscribe(`comment.${commentsid}`, ctx.userSubscriber);

      let dbTopicModel = DBModels.TopicModel;
      dbTopicModel.findOneAndUpdate({ "_id": payloadata.topicid },{ "$push": { "comments": commentsid } }, {new: true},(err,updatedtopic)=>{
        //console.log("insertcommentstotopic newtopic===>" + JSON.stringify(newtopic));
        socket.emit('forum.insertcommentstotopic_result',{updatedtopic});
        console.log(`${typeof (updatedtopic.creator)}`);
        console.log(`${typeof (ctx.userid)}`);
        console.log(`${typeof (ctx.userid.toString())}`);
        //-----------帖子上插入评论-----------
        if(updatedtopic.creator.toString() !== ctx.userid.toString()){
          console.log(`${updatedtopic.creator}??${ctx.userid}`);
          let useralerttopic = {
            creator:updatedtopic.creator,
            type:'topiccomment',
            topicself:updatedtopic._id,
            comment:newcomments._id,
            userfrom:ctx.userid,
            created_at:new Date(),
          };
          let dbModel = DBModels.UserAlertTopicModel;
          let entity = new dbModel(useralerttopic);
          entity.save((err,useralerttopicnew)=>{
            if(!err){
              //socket.emit('serverpush_useralerttopic',useralerttopicnew);
              PubSub.publish(`topic.${updatedtopic._id}`,useralerttopicnew);
            }
          });
        }
        //-----------帖子上插入评论-----------
      });
    }
  });
}

exports.insertcommentstocomments = (socket,payloadata,ctx)=>{
  //评论上插入评论
  let entitydata = payloadata.comment;
  entitydata.creator = ctx.userid;
  entitydata.created_at = new Date();
  entitydata.isvisiable = true;

  let dbModel = DBModels.CommentModel;
  let entity = new dbModel(entitydata);
  entity.save((err,newcomments)=>{
    if(!err){
      socket.emit('forum.insertcommentstocomments_result',{newcomments});
      //push to comment
      dbModel.findOneAndUpdate({ "_id": payloadata.commentid },{ "$push": { "comments": newcomments._id } }, {new: true},(err,updatedcomment)=>{
        //console.log("insertcommentstotopic newtopic===>" + JSON.stringify(newtopic));
        socket.emit('forum.insertcommentstocomments_result',{updatedcomment});
        //-----------评论上插入评论-----------
        if(updatedcomment.creator.toString() !== ctx.userid.toString()){
          console.log(`${updatedcomment.creator}??${ctx.userid}`);
          let useralerttopic = {
            creator:updatedcomment.creator,
            type:'commentcomment',
            topicself:payloadata.topicid,
            commentself:updatedcomment._id,
            comment:newcomments._id,
            userfrom:ctx.userid,
            created_at:new Date(),
          };
          let dbModel = DBModels.UserAlertTopicModel;
          let entity = new dbModel(useralerttopic);
          entity.save((err,useralerttopicnew)=>{
            if(!err){
              //socket.emit('serverpush_useralerttopic',useralerttopicnew);
              PubSub.publish(`comment.${updatedcomment._id}`,useralerttopicnew);
            }
          });
        }
        //-----------评论上插入评论-----------
      });
    }
  });
}

//populate
exports.gettopiclist  = (socket,payloadata,ctx)=>{
  //获取所有帖子列表
  let dbModel = DBModels.TopicModel;
  payloadata.query.creator = {$nin:ctx.shield};
  payloadata.query.isvisiable = true;
  payloadata.options.populate =
  [
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
  ];
  dbModel.paginate(payloadata.query,payloadata.options,(err,list)=>{
    if(!err){
      //console.log("gettopiclist===>" + JSON.stringify(list));
      socket.emit('forum.gettopiclist_result',{result:list});
    }
  });

  //测试关联表
  // let dbModel = DBModels.TopicModel;
  //
  // dbModel.find({}).populate("creator comments").exec((err, alltopiclist)=> {
  //   console.log("gettopiclist===>" + JSON.stringify(alltopiclist));
  // });
}
//==================
