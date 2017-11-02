let express = require('express');
let app = express();
let path = require('path');
const fs = require('fs');
let winston = require('./log/log.js');
let http = require('http').Server(app);
const https = require('https');
let bodyParser = require("body-parser");
const config = require('../config');
const routerindex = require("./router/index.js");
const upload = require('jquery-file-upload-middleware');
const uuid = require('node-uuid');
const _  = require('lodash');

let startsrv = ()=>{
  let appdir = path.join(__dirname,config.publishdirapp);
  console.log("static appdir:" + appdir);
  app.use('/app', express.static(appdir));
  fs.exists(`${appdir}/index.html`,(exists)=>{
    if(exists){
       console.log(`${appdir}/index.html -->存在`);
    }
    else{
      console.log(`${appdir}/index.html -->不存在`);
    }
  });

  let testdir = path.join(__dirname,config.publishdirtest);
  console.log("static test:" + testdir);
  app.use('/test', express.static(testdir));

  let logdir = path.join(__dirname,config.publishlog);
  console.log("static test:" + logdir);
  app.use('/log', express.static(logdir));

  let admindir = path.join(__dirname,config.publishdiradmin);
  console.log("static admin:" + admindir);
  app.use('/admin', express.static(admindir));

  let uploaddir = path.join(__dirname,'./router',config.uploaddir);
  console.log("static upload:" + uploaddir);
  app.use(config.uploadurl, express.static(uploaddir));


  console.log('uploadurl:' + config.uploadurl);
  console.log('uploaddir:' + uploaddir);

  app.use(function (req, res, next) {
    //支付宝的坑
    if (req.url == '/pay/alipay' || req.url == '/pay/alipay/test'){
      console.log(`接收到支付宝回调:${req.url}`);
      console.log(req.headers['content-type']);
      req.headers['content-type'] = 'application/x-www-form-urlencoded';
    }
    next();
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use((req, res, next)=> {
      console.log('req.url:' + req.url);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
      next();
  });

  upload.configure({
    uploadDir: uploaddir,
    uploadUrl: config.uploadurl,
    accessControl: {
        allowOrigin: '*',
        allowMethods: 'POST'
    },
    imageVersions: {// apt-get install imagemagick
      thumbnail: {
        width: 300,
        height: 300
      }
    }
  });

  upload.on("begin", (fileInfo)=> {
    let ext = 'jpg';
    let sz = _.split(fileInfo.type, '/');
    if(sz.length > 1){
      ext = sz[sz.length - 1];
    }
    fileInfo.name = `${uuid.v4()}.${ext}`;
    console.log(`开始上传文件:${JSON.stringify(fileInfo)}`);
  });

  upload.on('error', function (e, req, res) {
        console.log(e.message);
    });
  app.use('/uploadavatar',upload.fileHandler());



  routerindex.startrouter(app);

  http.listen(config.listenport, ()=>{
    console.log('listening on *:' + config.listenport);
    winston.initLog();

  });

  if(config.enabelssl){
    console.log("static rider:" + path.join(__dirname, '../certificate/private.pem'));
    const privateKey  = fs.readFileSync(path.join(__dirname, '../certificate/private.pem'), 'utf8');
    const certificate = fs.readFileSync(path.join(__dirname, '../certificate/file.crt'), 'utf8');
    const credentials = {key: privateKey, cert: certificate};
    const httpsServer = https.createServer(credentials, app);
    //创建https服务器
    httpsServer.listen(443, ()=> {
        console.log('HTTPS Server is running on: https://localhost:%s', 443);
    });
  }


  return http;
};

exports.startsrv = startsrv;
