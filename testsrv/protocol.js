
const maclen = 6;
const macoffset = 1;
const lengthoffset = macoffset + maclen;
const cmdoffset = lengthoffset + 2;
const data_headlen = 1+maclen+2+1;
//<<<---------思路-------------
let bufmaccmd = (mac,cmd,value)=>{
  const bufvalue = Buffer.allocUnsafe(1);
  //bufvalue.writeInt8(value, 0);
  bufvalue[0] = value;
  return bufget(mac,cmd,bufvalue);
}

let bufget = (mac,cmd,bufvalue)=>{
  const buf = Buffer.allocUnsafe(data_headlen+bufvalue.length);
  //buf.writeInt8(0xAA, 0);
  buf[0] = 0xAA;
  let macbuf = Buffer.from(mac,'hex');
  macbuf.copy(buf,macoffset,0,maclen);
  buf.writeInt16BE(bufvalue.length, lengthoffset);
  //buf.writeInt8(cmd,cmdoffset);
  buf[cmdoffset] = cmd;
  //buf.writeInt8(value,data_headlen);
  bufvalue.copy(buf,data_headlen,0,bufvalue.length);
  return buf;
}

exports.bufmaccmd = bufmaccmd;
exports.bufget = bufget;

exports.gettestbuf_sendcmd = ()=>{
  const testbuf = bufmaccmd('0800200A8C6D',0x00,0x01);
  let bufstring = testbuf.toString('hex');
  console.log(`发送命令:${bufstring}`);
  return testbuf;
}
//---for test---
exports.gettestbuf_data = ()=>{
  let bufdata = Buffer.allocUnsafe(18);

  let dataoffset = 0;
  dataoffset = bufdata.writeInt16BE(100, dataoffset);//原水流量数
  dataoffset = bufdata.writeInt16BE(200, dataoffset);//净水流量数
  dataoffset = bufdata.writeInt16BE(120, dataoffset);//原水TDS
  dataoffset = bufdata.writeInt16BE(300, dataoffset);//净水TDS
  dataoffset = bufdata.writeInt16BE(10, dataoffset);//5微米pp滤芯已用天数
  dataoffset = bufdata.writeInt16BE(11, dataoffset);//颗粒活性炭已用天数
  dataoffset = bufdata.writeInt16BE(23, dataoffset);//1微米pp滤芯已用天数
  dataoffset = bufdata.writeInt16BE(34, dataoffset);//反渗透RO膜已用天数
  dataoffset = bufdata.writeInt16BE(45, dataoffset);//后置活性炭已用天数
  bufstring = bufdata.toString('hex');
  console.log(`数据部分:${bufstring}`);
  let testbufdata = bufget('0800200A8C6D',0,bufdata);
  bufstring = testbufdata.toString('hex');
  console.log(`数据全部:${bufstring}`);
  return testbufdata;
}
