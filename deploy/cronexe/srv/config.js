const moment = require('moment');
const _ = require('lodash');
const config =  {
  name:process.env.name ||'cronexe',
  logdir:process.env.logdir ||'./log',
  shellcmd:process.env.shellcmd || 'echo {curday}',
  crontime:process.env.crontime || '0 2 * * *',
  istest:process.env.istest==='true'?true:false,
  version:'1.0.0(build0103)',
};



module.exports = config;
