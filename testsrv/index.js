"use strict";

const test = require('./protocol.js');
const net = require('net');
const ip = process.env.targetip || '127.0.0.1';//'114.55.89.241';//'127.0.0.1';//'114.55.89.241';//目标ip
const port = 52341;//目标端口
// const datatosend = 'aae02a84';//16进制字符串
//
// const maclen = 12;
// const macoffset = 1;
// const lengthoffset = macoffset + maclen;
// const cmdoffset = lengthoffset + 2;
// const data_headlen = 1+maclen+2+1;
// //<<<---------思路-------------
// // 包头	 	 	0xaa
// // ID号
// // 报文长度1
// // 报文长度2
// // 命令码
// //[数据部分]
// let bufmaccmd = (mac,cmd,value)=>{
//   const buf = Buffer.allocUnsafe(data_headlen+1);
//   buf.writeInt8(0xAA, 0);
//   let macbuf = Buffer.from(mac,'hex');
//   macbuf.copy(buf,macoffset,0,maclen);
//
//   buf.writeInt8(0, lengthoffset);
//   buf.writeInt8(1, lengthoffset+1);
//   buf.writeInt8(cmd,cmdoffset);
//
//   buf.writeInt8(value,data_headlen);
//   return buf;
// }
//
// let mac = '0800200A8C6D';

const client = net.connect({port: port,host:ip}, () => {
  // 'connect' listener
  const buf = test.gettestbuf_data(process.env.targetmac ||'0800200A8C6D');//Buffer.from(datatosend,'hex');
  let bufstring = buf.toString('hex');
  console.log(`连接上服务器【${ip}:${port}】,发送数据${bufstring}`);
  client.write(buf);
});

client.on('data', (data) => {
  console.log(`接收到数据为${data.toString('hex')}`);
  client.end();
});

client.on('end', () => {
  console.log(`和服务器断开`);
});
