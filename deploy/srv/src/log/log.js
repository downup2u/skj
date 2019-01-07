var winston = require('winston');
var moment = require('moment');
var path = require('path');
const config = require('../../config');
var logger;
exports.initLog =  ()=>{
  var filename = `shuihezi${moment().format('YYYYMMDD')}`;//+moment().format('YYYY-MM-DD-HHmmss');

  var logfile = filename+".log";
  let logdir = path.join(__dirname,'../',config.publishlog);
  var logpath = `${logdir}/${logfile}`;

  var logfileerr = filename+"_err.log";
  var logpatherr = `${logdir}/${logfileerr}`;

  var logfilewarn = filename+"_warn.log";
  var logpathwarn =  `${logdir}/${logfilewarn}`;

  console.log(`logpath:${logpath},logpatherr:${logpatherr},logpathwarn:${logpathwarn}`);
  // winston.configure({
  //   transports: [
  //     new (winston.transports.File)({ filename: logpath ,level: 'info'}),
  //     new (winston.transports.File)({  filename: logfileerr, level: 'error'  }),
  //   ]
  // });

    logger = new (winston.Logger)({
      transports: [
        new (winston.transports.File)({
          name: 'info-file',
          filename: logpath ,
          level: 'info'
        }),
        new (winston.transports.File)({
          name: 'error-file',
          filename: logpatherr,
          level: 'error'
        }),
        new (winston.transports.File)({
          name: 'warn-file',
          filename: logpathwarn,
          level: 'warn'
        }),
      ]
  });
};

exports.getlog = ()=>{
   return logger;
}
