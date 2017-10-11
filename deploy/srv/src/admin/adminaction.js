let PubSub = require('pubsub-js');
const withdraw = require('../handler/shop/withdrawcash.js');
let DBModels = require('../db/models.js');
const jpush = require('../smspush/push.js');

let preaction =(actionname,collectionname,doc,fnresult)=>{
  let retdoc = doc;
  if(actionname === 'findByIdAndUpdate' && collectionname === 'withdrawcashapply'){
    //这里需要判断很多东西，比如用户余额是否大于可提取余额
    //是否已经提取过等等
    //==============待定==============
    let userModel = DBModels.UserModel;
    userModel.findOne({_id:doc.creator},(err,result)=>{
      if(!err && result){
        if(result.balance > doc.cashmoney){
          //用户余额是否大于可提取余额
          let withdrawModel = DBModels.WithdrawcashapplyModel;
          withdrawModel.findOne({_id:doc.id,status: { $ne: '已支付' }},(err,result)=>{
            if(!err && result){
              fnresult(null,true);
              return;
            }
            fnresult({errmessage:'已经支付过了，请勿重新操作'});
          });
          return;
        }
      }
      fnresult({errmessage:'可能用户余额不足,或找不到该用户'});
    })
    return;
  }
  if(actionname === 'findByIdAndUpdate' && collectionname === 'order'){
    if(doc.hasOwnProperty('expressid')){
      let expressModel = DBModels.ExpressModel;
      expressModel.findOne({_id:doc.expressid}, (err, exp)=> {
        if(!err && exp){
          doc.expresscode = exp.expresscode;
        }
        fnresult(null,true);
      });
      return;
    }
  }
  if(actionname === 'findByIdAndUpdate' && collectionname === 'notifymessage'){
    doc.created_at = new Date();
    fnresult(null,true);
    return;
  }
  fnresult(null,true);
};

let postaction =(actionname,collectionname,doc)=>{
  console.log("postaction err======>" + JSON.stringify(actionname));
  console.log("postaction result======>" + JSON.stringify(collectionname));
  console.log("postaction result======>" + JSON.stringify(doc));
  let retdoc = doc;
  if(actionname === 'findByIdAndUpdate' && collectionname === 'withdrawcashapply'){
    if(doc.status === '已支付' || doc.status === '已拒绝'){
      withdraw.withdrawcashapplypaid(doc,(err,result)=>{
          console.log("withdrawcashapplypaid err======>" + JSON.stringify(err));
          console.log("withdrawcashapplypaid result======>" + JSON.stringify(result));
      });
    }
  }

  if(collectionname==='notifymessage'){
      if(actionname=== 'save' || actionname === 'findByIdAndUpdate'){
        jpush.sendnotifymessage(doc,(err,result)=>{
           //设置推送消息：
           console.log(`设置推送消息：err:${JSON.stringify(err)}`);
           console.log(`设置推送消息：result:${JSON.stringify(result)}`);
        });
      }
  }
};

exports.preaction = preaction;
exports.postaction = postaction;
