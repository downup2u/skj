let winston = require('./log/log.js');
let PubSub = require('pubsub-js');
const config = require('../config.js');
const handlemessage = require('./handler/index.js');
const socketsubfn = require('./handler/socketsubscribe.js');

/*
topic定义:
allpushmsg<--所有消息
alldrivers<--所有司机
allriders<--所有乘客
userid<--指定用户
request.id<--指定请求
login/logout
*/
let startwebsocketsrv = (http)=>{
  let io = require('socket.io')(http);

  io.on('connection', (socket)=>{
    console.log('a user connected');

    let ctx = {
      shield:[]
    };//for each connection
    socketsubfn.usersubfn(socket,ctx);
    //ctx.tokensubscribe = PubSub.subscribe('allmsg', ctx.userSubscriber);

    socket.on('message',(payload)=>{
      console.log('get message:' + JSON.stringify(payload));
      handlemessage(socket,payload,ctx);
    });

    socket.on('error',(err)=>{
      console.log("socket err:" + JSON.stringify(err));
      socket.disconnect(true);


    });

    socket.on('disconnect', ()=> {
      console.log("socket disconnect!");
      PubSub.unsubscribe( ctx.userSubscriber );

    });
  });

};

exports.startsrv = startwebsocketsrv;
