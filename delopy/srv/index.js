const srvhttp = require('./src/srvhttp.js');
const srvwebsocket = require('./src/srvws.js');
const srvsystem = require('./src/srvsystem.js');
var tcpSrv = require('./src/tcpsrv.js');

const config = require('./config');
let mongoose     = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(config.mongodburl,{
    socketOptions: {
      // This option is on by default, but why not set it explicitly
      autoReconnect: true
    },
    // This options is 1 second by default, its possible the ha
    // takes longer than 30 seconds to recover.
    reconnectInterval: 5000,
    // This options is 30 by default, why not make it 60
    reconnectTries: Number.MAX_VALUE
  })

srvsystem.job();
srvwebsocket.startsrv(srvhttp.startsrv());
tcpSrv.starttcpsrv({listenport:config.tcpport});
process.on('uncaughtException', (err)=> {
    console.log(err);
});


// let topiclist = {message:'aaa'};
// console.log("topiclist==>" + JSON.stringify({topiclist}));
