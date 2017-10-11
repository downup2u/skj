/**
 * Created by wangxiaoqing on 2017/3/25.
 */

const config = require('../config');
let mongoose = require('mongoose');
let winston = require('./log/log.js');
let DBModels = require('./db/models.js');
const _ = require('lodash');
const schedule = require('node-schedule');

let createadmin = ()=>{
  let userModel = mongoose.model('UserAdmin', DBModels.UserAdminSchema);
  userModel.findOne({username: 'admin'}, (err, adminuser)=> {
    if(!err && !adminuser) {
        adminuser = {
          username:'admin',
          password: 'admin'
        };
        let entity = new userModel(adminuser);
        entity.save((err)=> {
        });
    }
  });
};

let createexpress = ()=>{
    var express = {
      "auspost": "澳大利亚邮政",
      "aae": "AAE",
      "anxindakuaixi": "安信达",
      "huitongkuaidi": "汇通快运",
      "baifudongfang": "百福东方",
      "bht": "BHT",
      "youzhengguonei": "邮政小包（国内）",
      "bangsongwuliu": "邦送物流",
      "cces": "希伊艾斯（CCES）",
      "coe": "中国东方（COE）",
      "chuanxiwuliu": "传喜物流",
      "canpost": "加拿大邮政Canada Post",
      "canpostfr": "加拿大邮政Canada Post",
      "datianwuliu": "大田物流",
      "debangwuliu": "德邦物流",
      "dpex": "DPEX",
      "dhl": "DHL-中国件-中文结果",
      "dhlen": "DHL-国际件-英文结果",
      "dhlde": "DHL-德国件-德文结果（德国国内派、收的件）",
      "dsukuaidi": "D速快递",
      "disifang": "递四方",
      "ems": "E邮宝",
      "emsen": "EMS（英文结果)",
      "emsguoji": "EMS-（中国-国际）件-中文结果",
      "emsinten": "EMS-（中国-国际）件-英文结果",
      "fedex": "Fedex-国际件-英文结果",
      "fedexcn": "Fedex-国际件-中文结果",
      "fedexus": "Fedex-美国件-英文结果",
      "feikangda": "飞康达物流",
      "feikuaida": "飞快达",
      "rufengda": "如风达快递",
      "fengxingtianxia": "风行天下",
      "feibaokuaidi": "飞豹快递",
      "ganzhongnengda": "港中能达",
      "guotongkuaidi": "国通快递",
      "guangdongyouzhengwuliu": "广东邮政",
      "youzhengguoji": "邮政小包（国际）",
      "gls": "GLS",
      "gongsuda": "共速达",
      "huiqiangkuaidi": "汇强快递",
      "tiandihuayu": "天地华宇",
      "hengluwuliu": "恒路物流",
      "huaxialongwuliu": "华夏龙",
      "tiantian": "天天快递",
      "haiwaihuanqiu": "海外环球",
      "hebeijianhua": "河北建华",
      "haimengsudi": "海盟速递",
      "huaqikuaiyun": "华企快运",
      "haihongwangsong": "山东海红",
      "jiajiwuliu": "佳吉物流",
      "jiayiwuliu": "佳怡物流",
      "jiayunmeiwuliu": "加运美",
      "jinguangsudikuaijian": "京广速递",
      "jixianda": "急先达",
      "jinyuekuaidi": "晋越快递",
      "jietekuaidi": "捷特快递",
      "jindawuliu": "金大物流",
      "jialidatong": "嘉里大通",
      "kuaijiesudi": "快捷速递",
      "kangliwuliu": "康力物流",
      "kuayue": "跨越物流",
      "lianhaowuliu": "联昊通",
      "longbanwuliu": "龙邦物流",
      "lanbiaokuaidi": "蓝镖快递",
      "lejiedi": "乐捷递",
      "lianbangkuaidi": "联邦快递",
      "lianbangkuaidien": "联邦快递(英文）",
      "lijisong": "立即送",
      "longlangkuaidi": "隆浪快递",
      "menduimen": "门对门",
      "meiguokuaidi": "美国快递",
      "mingliangwuliu": "明亮物流",
      "ocs": "OCS",
      "ontrac": "onTrac",
      "quanchenkuaidi": "全晨快递",
      "quanjitong": "全际通",
      "quanritongkuaidi": "全日通",
      "quanyikuaidi": "全一快递",
      "quanfengkuaidi": "全峰快递",
      "sevendays": "七天连锁",
      "shentong": "申通",
      "shunfeng": "顺丰速递",
      "shunfengen": "顺丰（英文结果）",
      "santaisudi": "三态速递",
      "shenghuiwuliu": "盛辉物流",
      "suer": "速尔物流",
      "shengfengwuliu": "盛丰物流",
      "shangda": "上大物流",
      "saiaodi": "赛澳递",
      "sxhongmajia": "山西红马甲",
      "shenganwuliu": "圣安物流",
      "suijiawuliu": "穗佳物流",
      "tnt": "TNT",
      "tnten": "TNT",
      "tonghetianxia": "通和天下",
      "ups": "UPS",
      "upsen": "UPS",
      "youshuwuliu": "优速物流",
      "usps": "USPS（",
      "wanjiawuliu": "万家物流",
      "wanxiangwuliu": "万象物流",
      "weitepai": "微特派",
      "xinbangwuliu": "新邦物流",
      "xinfengwuliu": "信丰物流",
      "neweggozzo": "新蛋奥硕物流",
      "hkpost": "香港邮政",
      "yuantong": "圆通速递",
      "yunda": "韵达快运",
      "yuntongkuaidi": "运通快递",
      "yuanchengwuliu": "远成物流",
      "yafengsudi": "亚风速递",
      "yibangwuliu": "一邦速递",
      "yuanweifeng": "源伟丰快递",
      "yuanzhijiecheng": "元智捷诚",
      "yuefengwuliu": "越丰物流",
      "yuananda": "源安达",
      "yuanfeihangwuliu": "原飞航",
      "zhongxinda": "忠信达",
      "zhimakaimen": "芝麻开门",
      "yinjiesudi": "银捷速递",
      "yitongfeihong": "一统飞鸿",
      "zhongtong": "中通速递",
      "zhaijisong": "宅急送",
      "zhongyouwuliu": "中邮物流",
      "zhongsukuaidi": "中速快件",
      "zhengzhoujianhua": "郑州建华",
      "zhongtianwanyun": "中天万运"
  };
   let expressModel = DBModels.ExpressModel;
   expressModel.findOne({}, (err, exp)=> {
    if(!err && !exp) {
        _.map(express,(name,id)=>{
          let expressobj = {
            expressname:name,
            expresscode:id,
            memo:name,
            isvisiable:false
          };
          let entity = new expressModel(expressobj);
          entity.save((err)=> {
          });
        });

    }
  });
}

let setmycouponsexpired = ()=>{
  let nowDate = new Date();
  let myCouponModel = DBModels.MyCouponModel;
  myCouponModel.update({
      'expdate': { // 小于今天
         '$lte': nowDate
      },
      'usestatus':'未使用'
  },{$set:{usestatus:'已过期'}},(err,result)=>{
      ////winston.getlog().info(`设置优惠券过期:${JSON.stringify(result)}`);
  });
};

// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    |
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

let updatesystemconfig = ()=>{
  let sysModel = DBModels.SystemConfigModel;
  sysModel.findOne({}, (err, systemconfig)=> {
    systemconfig = systemconfig.toJSON();
    if(!err && !!systemconfig){
      config.setdeviceconfig(systemconfig);

      console.log(`config====>${JSON.stringify(config)}`);
    }
  });
}

let job=()=>{
    updatesystemconfig();

    createadmin();

    createexpress();

    setmycouponsexpired();//设置优惠券自动过期
    schedule.scheduleJob('0 0 * * *', ()=>{
      //每天0点更新优惠券过期信息
      setmycouponsexpired();
    });

    schedule.scheduleJob('*/5 * * * *', ()=>{
      //console.log('每隔5分钟执行这里!');
      updatesystemconfig();
    });
};

exports.job = job;
