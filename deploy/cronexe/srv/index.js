const config = require('./config');
const winston = require('./log/log.js');
const _ = require('lodash');
const schedule = require('node-schedule');
const shell = require('shelljs');
const moment = require('moment');
const debug = require('debug')('srv:start');
const format = require('string-format')
format.extend(String.prototype, {});

winston.initLog();

winston.getlog().info(`==程序启动${config.version},istest:${config.istest},shellcmd:${config.shellcmd},crontime:${config.crontime}`);

const job = (callbackfn)=>{
  const shellcmd = config.shellcmd.format({curday:moment().format('YYYYMMDD')});
  console.log(shellcmd);
  shell.exec(shellcmd,(code, stdout, stderr)=>{
    winston.getlog().info(`命令行完毕:${code}-->${stdout}-->${stderr}`);
    callbackfn(null,true);
  });
};

if(config.istest){
  winston.getlog().info(`第一次执行---`);
  job(()=>{
  });
}

schedule.scheduleJob(config.crontime, ()=>{
    //每天3点开始工作<---改为2点开始工作
    winston.getlog().info(`cron模式---`);
    job(()=>{

    });
});


winston.getlog().info(`===执行到末尾===`);
