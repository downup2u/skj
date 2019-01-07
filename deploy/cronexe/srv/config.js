const moment = require('moment');
const _ = require('lodash');
const config =  {
  logdir:process.env.logdir ||'../../dist/log',
  shellcmd:process.env.shellcmd || 'cd root',
  crontime:process.env.crontime || '0 2 * * *',
  istest:process.env.istest==='true'?true:false,
  version:'1.0.0(build0103)',
};



module.exports = config;
