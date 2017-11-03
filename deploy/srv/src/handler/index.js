const userlogin = require('./userlogin.js');
const device = require('./device.js');
const forum = require('./forum.js');
const address = require('./address.js');
const notifymessage = require('./notifymessage');
const shop = require('./shop');
const feedback = require('./feedback');
const news = require('./news');
const app = require('./app');
const pay = require('./pay.js');
const about  = require('./about.js');
const order = require('./order.js');

const datahandler = {
  'getabouthtml':about.getabouthtml,
  'register':userlogin.registeruser,
  'findpwd':userlogin.findpwd,
  'login':userlogin.loginuser,
  'sendauth':userlogin.sendauth,
  'loginwithauth':userlogin.loginwithauth,
  'loginwithtoken':userlogin.loginwithtoken,
  'loginwithoauth':userlogin.loginwithoauth,
  'oauthbinduser':userlogin.oauthbinduser,
  'logout':userlogin.logout,
  'gettopiclist':forum.gettopiclist,
  'getnotifymessage':notifymessage.getnotifymessage,
  'getnotifymessageone':notifymessage.getnotifymessageone,

  'getnews':news.getnews,
  'getbanner':shop.getbanner,
  'getcategory':shop.getcategory,
  'getproduct':shop.getproduct,

  'feedbackaddone':feedback.feedbackaddone,
  'getsystemconfig':app.getsystemconfig,

};

const authhandler = {
  'getpaysign':pay.getpaysign,
  'queryuserbalance':userlogin.queryuserbalance,
  'fillprofile':userlogin.fillprofile,
  'setlastreadmsgtime':userlogin.setlastreadmsgtime,
  'resetdevicecmd':device.resetdevicecmd,
  'senddevicecmd':device.senddevicecmd,
  'createdevice':device.createdevice,
  'updatedevice':device.updatedevice,
  'getdevicelist':device.getdevicelist,
  'deletedevice':device.deletedevice,
  'getalldevicedata':device.getalldevicedata,

  'createaddress':address.createaddress,
  'deleteaddress':address.deleteaddress,
  'editaddress':address.editaddress,
  'getaddresslist':address.getaddresslist,

  'inserttopic':forum.inserttopic,
  'lovetopicadd':forum.lovetopicadd,
  'lovetopicunadd':forum.lovetopicunadd,
  'lovecommentsadd':forum.lovecommentsadd,
  'lovecommentsunadd':forum.lovecommentsunadd,
  'insertcommentstotopic':forum.insertcommentstotopic,
  'insertcommentstocomments':forum.insertcommentstocomments,
  'getmytopic':forum.getmytopic,
  'setuseralerttopicreaded':forum.setuseralerttopicreaded,
  'setuseralerttopicdeleted':forum.setuseralerttopicdeleted,

  'payorder':order.payorder,
  'mycartaddone':shop.mycartaddone,
  'mycartupdateone':shop.mycartupdateone,
  'mycartdelone':shop.mycartdelone,
  'mycartgetall':shop.mycartgetall,
  'mycollectionaddone':shop.mycollectionaddone,
  'mycollectiondelone':shop.mycollectiondelone,
  'mycollectiongetall':shop.mycollectiongetall,
  'mycollectionisproductexits':shop.mycollectionisproductexits,
  'myordergetall':shop.myordergetall,
  'myorderaddone':shop.myorderaddone,
  'myorderupdateone':shop.myorderupdateone,
  'myorderdelone':shop.myorderdelone,
  'queryorderstatusstat':shop.queryorderstatusstat,
  'productcommentaddone':shop.productcommentaddone,
  'productcommentsfromproduct':shop.productcommentsfromproduct,
  'productcommentsfromproductgetcount':shop.productcommentsfromproductgetcount,
  'withdrawcashapplyaddone':shop.withdrawcashapplyaddone,
  'withdrawcashapplyauth':shop.withdrawcashapplyauth,
  'mycoupongetall':shop.mycoupongetall,
  'getnextusers':shop.getnextusers,
  'getdistsalesorderstat':shop.getdistsalesorderstat,
  'getdistsalesorders':shop.getdistsalesorders,
  'getdistsalesorderdetails':shop.getdistsalesorderdetails,
  'getusermoney':shop.getusermoney,
  'getusergetpointsigntoday':shop.getusergetpointsigntoday,
  'useraddpoint':shop.useraddpoint,
  'getuserpointdetails':shop.getuserpointdetails,
  'expressquery':shop.expressquery
};


module.exports = (socket,payload,ctx)=>{

  if(datahandler.hasOwnProperty(payload.cmd)){
    datahandler[payload.cmd](socket,payload.data,ctx);
  }
  else{
    if(authhandler.hasOwnProperty(payload.cmd)){
      if(!ctx.hasOwnProperty('userid')){
          //auth failed!
          if(payload.cmd === 'setlastreadmsgtime'){//这个消息比较特殊
            socket.emit('setlastreadmsgtime_result', {lastreadmsgtime_at: new Date()});
            return;
          }
          if(payload.cmd === 'fillprofile'){
            let {profile} = payload.data;
            profile['shield'] = profile['shield']  || [];
            ctx.shield = profile['shield'];
            socket.emit('fillprofile_result', {profile});
            return;
          }
          console.log("需要登录--->" + payload.cmd);
      }
      else{
        authhandler[payload.cmd](socket,payload.data,ctx);
      }
    }
    else{
      console.log("未找到处理函数--->" + payload.cmd);
    }
  }
}
