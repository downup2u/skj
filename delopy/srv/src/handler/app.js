let DBModels = require('../db/models.js');
let winston = require('../log/log.js');


exports.getsystemconfig = (socket,actiondata,ctx)=>{
    let order = actiondata;
    dbModel = DBModels.SystemConfigModel;
    dbModel.findOne({},(err,systemconfig)=>{
        if(!err && !!systemconfig){
            systemconfig = systemconfig.toJSON();
            let sharesetting = systemconfig.sharesetting;
            try{
                sharesetting   = JSON.parse(sharesetting);
            }
            catch(e){
                sharesetting = {
                    "title":"(后台需要设置分享标题)",
                    "descrption":"(后台需要设置分享详情内容)",
                    "picture":"https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2378550344,2476789148&fm=58",
                    "url":"http://www.xiaheng.net/",
                };
            }
            let memberlevelsetting = systemconfig.memberlevelsetting;
            try{
                memberlevelsetting   = JSON.parse(memberlevelsetting);
            }
            catch(e){
                memberlevelsetting = {
                    "初级会员":0,
                    "中级会员":200,
                    "高级会员":500,
                    "黄金会员":1000,
                    "钻石会员":1500,
                };
            }
            let payload = {
                sharesetting,
                memberlevelsetting,
                downloadurl:systemconfig.downloadurl,
                pointfornewtopic:systemconfig.pointfornewtopic,
                expressfee : systemconfig.expressfee,
                expressfeeforfree: systemconfig.expressfeeforfree,
                productcategoryid1: systemconfig.productcategoryid1,
                productcategoryid2: systemconfig.productcategoryid2,
                bonuslevel1: systemconfig.bonuslevel1,//一级分销提成百分比
                bonuslevel2: systemconfig.bonuslevel2,//二级分销提成百分比
                pointvsmoney: systemconfig.pointvsmoney,//换算,例1积分换1分
                getpointfromsign: systemconfig.getpointfromsign,//每天签到一次
                getpointfromshare: systemconfig.getpointfromshare,//分享得到积分
                pointlimitshare: systemconfig.pointlimitshare,//每天最多获得分享的积分

            };
            socket.emit('getsystemconfig_result',payload);
        }
        else{
            //winston.getlog().error(`获取系统设置失败！`);
        }

    });
}
