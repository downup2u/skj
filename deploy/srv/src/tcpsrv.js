var net = require('net');
var winston  = require('./log/log.js');
// var GlobalEmitter = require('./eventemitter');
let mongoose = require('mongoose');
const util = require('./util/util.js');
const GetData = require('./devicetcp/devicedata.js');
const SaveData = require('./devicetcp/devicedatadb.js');
const Protocol = require('./devicetcp/protocol.js');
const maclen = 6;
const macoffset = 1;
const lengthoffset = macoffset + maclen;
const cmdoffset = lengthoffset + 2;
const data_headlen = 1+maclen+2+1;

const tcpsocksmap = new Map();

let getsocketfrommac = (mac)=>{
  let obj = tcpsocksmap.get(mac);
  if(!!obj){
    return obj.socket;
  }
  return null;
}

const getpureIp = (ip) => {
    return ip.indexOf('::ffff:') == 0 ? ip.substring(ip.indexOf('::ffff:') + 7) : ip;
};
//订阅设备id,接收到消息时触发
//插入设备数据库,定时更新（历史数据）,publish给最新的用户
starttcpsrv = (settings)=> {
  net.createServer((socket)=> {
      let curid = undefined;
      let curaddress = {
        isget:false,
        provice:'',
        city:'',
        county:''
      };
      const remoteip = getpureIp(socket.remoteAddress);
      let fromsock = remoteip + ':' + socket.remotePort;
      winston.getlog().info("["+fromsock+"]接受一个socket");
      const ipaddr = getpureIp(remoteip);
      util.getIpInfo(ipaddr,(err,result)=>{
        if(!err && !!result){
          if(result.code === 0 && !!result.data){
            curaddress = {
              isget:true,
              ipaddr,
              provice:result.data.region,
              city:result.data.city,
              county:result.data.county
            };
          }
            // {
            //   "code": 0,
            //   "data": {
            //       "country": "中国",
            //       "country_id": "CN",
            //       "area": "华东",
            //       "area_id": "300000",
            //       "region": "江苏省",
            //       "region_id": "320000",
            //       "city": "常州市",
            //       "city_id": "320400",
            //       "county": "",
            //       "county_id": "-1",
            //       "isp": "电信",
            //       "isp_id": "100017",
            //       "ip": "114.228.37.134"
            //   }
            // }
          console.log(`result===>${JSON.stringify(result)}`);
        }
      });

      let recvbuf = new Buffer('','binary');

      socket.on("error", (err) =>{
        winston.getlog().info(`发生错误【${curid}】连接关闭`);
        //winston.getlog().error(err.stack);
        if(!!curid){
          tcpsocksmap.delete(curid);
        }

      });
      socket.on("close", (err) =>{
        //winston.getlog().info(err.stack);
        winston.getlog().info(`===>【${curid}】连接关闭`);
        if(!!curid){
          tcpsocksmap.delete(curid);
        }
      });
      socket.on('data',(data)=> {
        //下面3行为测试程序！！！
        let istest = false;
        if(istest){
          let indatabuf2 = Buffer.from(data,'binary');
          winston.getlog().info("["+fromsock+"]接收到数据:" + indatabuf2.toString('hex'));
          socket.write('abc');
        }
        else{
          let indatabuf = new Buffer(data,'binary');
          let totalLength = recvbuf.length + indatabuf.length;
          recvbuf = Buffer.concat([recvbuf, indatabuf],totalLength);
          winston.getlog().info(`待处理数据:${recvbuf.toString('hex')}`);
          // console.log(`待处理数据:${recvbuf.toString('hex')}`);
          //winston.getlog().info("["+fromsock+"]接收到数据:" + indatabuf.toString('hex'));

           while(recvbuf.length >= data_headlen){
               if(recvbuf[0] === 0xAA){
                 let datalen = (recvbuf[lengthoffset] << 8) + recvbuf[lengthoffset+1];
                 let newbufmac = Buffer.allocUnsafe(maclen);
                 console.log(`recvbuf1:${recvbuf.toString('hex')}`);
                 recvbuf.copy(newbufmac, 0, macoffset, macoffset+maclen);
                 let mac = newbufmac.toString('hex');//mac地址
                 //转为大写
                 mac = mac.toUpperCase();
                 if(!curid){
                   curid = mac;
                   tcpsocksmap.set(mac,{
                       socket,
                       remoteip
                      }
                    );
                 }
                 let cmd = recvbuf[cmdoffset];
                 console.log(`获取到mac地址:${mac},命令号:${cmd},长度:${datalen}`);
                 winston.getlog().info(`获取到mac地址:${mac},命令号:${cmd},长度:${datalen}`);
                 let newbuflen = data_headlen + datalen;
                 if(recvbuf.length >= newbuflen){
                       //parse data.
                       let bodybuf = Buffer.allocUnsafe(datalen);
                       console.log(`recvbuf=》${recvbuf.toString('hex')}`);
                       recvbuf.copy(bodybuf, 0, data_headlen, data_headlen+datalen);
                       console.log(`获取到数据部分:${bodybuf.toString('hex')}`);
                       winston.getlog().info(`获取到数据部分:${bodybuf.toString('hex')}`);
                       if(bodybuf.length >= 18 && cmd===0x00){
                         let devicedata = GetData(bodybuf);
                         winston.getlog().info(`解析到数据了:${JSON.stringify(devicedata)}`);
                         SaveData(mac,devicedata,curaddress);
                         socket.write('a');//随便发一个数据，保持链接状态
                         winston.getlog().info(`【${curid}】发送a的数据`);
                       }

                       //<----------------
                       let leftbuf = Buffer.allocUnsafe(recvbuf.length - newbuflen);
                       recvbuf.copy(leftbuf, 0, newbuflen,recvbuf.length);

                       recvbuf = leftbuf;
                        //renew buffer
                      continue;
                  }
               }//必须0xAA开头
               else{
                  //error
                  winston.getlog().info(`【${curid}】连接关闭`);
                  socket.end();
                  socket.destroy();
                  if(!!curid){
                    tcpsocksmap.delete(curid);
                  }
                }
                break;//不符协议
            }
        }

      });
  }).listen(settings.listenport, (socket)=> {
      //winston.getlog().info("侦听端口:" + settings.listenport);
  });
};

exports.getsocketfrommac = getsocketfrommac;
exports.starttcpsrv= starttcpsrv;
exports.bufmaccmd = Protocol.bufmaccmd;
