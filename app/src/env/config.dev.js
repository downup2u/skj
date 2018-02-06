let islocalhost = false;
let config = {
  serverurl:islocalhost?'http://localhost:3100':'http://skj.com28.cn',//'http://localhost:3100'
  requesttimeout:15000,
  appversion : "1.3.3",
  appurl : "http://www.baidu.com",
  refreshserverdateinterval:60000,//1 minute
  warningpercentdefault : 0.95,//黄色提示百分比
  outlinetime : 5*60*1000//判断断水时间5分钟
};

export default config;
