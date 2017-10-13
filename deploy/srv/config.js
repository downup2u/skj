let config =  {
  secretkey:'shuikejingkey',
  listenport:process.env.listenport ||3100,
  rooturl:process.env.rooturl ||'http://skj.com28.cn',
  publishdirtest:'/dist/test',
  publishdirapp:'/dist/app',
  publishdiradmin:'/dist/admin',
  publishlog:'/dist/log',
  uploaddir:'/dist/uploader',
  uploadurl:'/uploader',
  expRequestMinutes:2,//2分钟之内
  maxAge:86400000,
  maxDistance:3,
  authexptime:120,//验证码有效期，2分钟
  loginuserexptime:60*60*24*30,//用户登录有效期,30天
  mongodburl:process.env.MONGO_URL || 'mongodb://localhost/skj',

  tcpport:process.env.tcpport ||52341,
  deviceconfig:{
    //  gradetotal:{
    //    '优':100,
    //    '良':90,
    //    '差':32,
    //    '不要太好':320,
    //  },
    //  gradeleft:{
    //    '不健康':29,
    //    '一般健康':290,
    //    '非常健康':2900,
    //    '可直饮':10000,
    //    '一般':500,
    //  },
    //  graderight:{
    //    '不健康':29,
    //    '一般健康':290,
    //    '非常健康':2900,
    //    '可直饮':10000,
    //    '一般':500,
    //  },
    //  systotal89:100,
    //  systotal1011:100,
    //  systotal1213:100,
    //  systotal1415:100,
    //  systotal1617:100,
  },

};

config.setdeviceconfig =  (systemconfig)=>{
  try{
    console.log(`systemconfig.gradetotal===>${systemconfig.gradetotal}`);
    if(typeof systemconfig.gradetotal === 'string'){
      systemconfig.gradetotal = JSON.parse(systemconfig.gradetotal);
    }
    console.log(`systemconfig.gradeleft===>${systemconfig.gradeleft}`);
    if(typeof systemconfig.gradeleft === 'string'){
      systemconfig.gradeleft = JSON.parse(systemconfig.gradeleft);
    }
    console.log(`systemconfig.graderight===>${systemconfig.graderight}`);
    if(typeof systemconfig.graderight === 'string'){
      systemconfig.graderight = JSON.parse(systemconfig.graderight);
    }
  }
  catch(e){
    console.log(`抛异常了!!${e}`);
  }

  config.deviceconfig = {
    gradetotal:systemconfig.gradetotal,
    gradeleft:systemconfig.gradeleft,
    graderight:systemconfig.graderight,
    systotal89:systemconfig.systotal89,
    systotal1011:systemconfig.systotal1011,
    systotal1213:systemconfig.systotal1213,
    systotal1415:systemconfig.systotal1415,
    systotal1617:systemconfig.systotal1617,
  };
  console.log(`setdeviceconfig:${JSON.stringify(config)}`);
};

module.exports = config;
