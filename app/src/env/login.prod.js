import * as xview from './xview/Common';

export const haveWechatApp=(fncallback)=>{
  if(!!xview){
    xview.haveWechatApp((data)=>{
      fncallback(data);
    });
  }

}


export const loginQQ = (fncallback)=>{
    if(!!xview){
      xview.loginToTencentQQ((result)=>{
        if(typeof result === 'string'){
            result = JSON.parse(result);
        }
        //alert(JSON.stringify(result));
        result.openId = result.openId || result.openid ;
        fncallback(result);
      });
    }
  }


  export const loginWx=(fncallback)=>{
    if(!!xview){
      xview.loginToWeixin((result)=>{
        if(typeof result === 'string'){
            result = JSON.parse(result);
        }
        //alert(JSON.stringify(result));
        result.openid = result.openid || result.openId ;
        fncallback(result);
      });
    }
  }
