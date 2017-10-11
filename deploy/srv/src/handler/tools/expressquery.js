const request = require('request');
const CryptoJS = require("crypto-js");
let isconfigget = false;
let expressapiurl = 'http://poll.kuaidi100.com/poll/query.do';
let expressapicustomer = 'C705DACD09FC967E59070D3FA2B1F0C2';
let expressapikey = 'aHpmOsSO3530';
let DBModels = require('../../db/models.js');

let expressquery = (queryparam,callbackfn)=>{
    if(!isconfigget){
        let dbModel = DBModels.SystemConfigModel;
        dbModel.findOne({},(err,systemconfig)=>{
            if(!err && systemconfig){
                isconfigget = true; 
                expressapiurl = systemconfig.expressapiurl;
                expressapicustomer = systemconfig.expressapicustomer;
                expressapikey = systemconfig.expressapikey;
                expressquery(queryparam,callbackfn);
            }
        });
        return;
    }

    let param = `{"com":"${queryparam.expresscode}","num":"${queryparam.expressbarid}"}`
    let sign = CryptoJS.MD5(param+expressapikey+expressapicustomer).toString().toUpperCase();
   
    request.post(
          expressapiurl,
          {
              form:{
                param:param,
                sign:sign,
                customer:expressapicustomer
             }
            }
        ,(error, response, body)=> {
            callbackfn(body);
            console.log(`error:${JSON.stringify(error)}`);
            console.log(`body:${JSON.stringify(body)}`);
    });

};

// expressquery({
//     expresscode:'shunfeng',
//     expressbarid:'216724675295'
// });

exports.expressquery = expressquery;