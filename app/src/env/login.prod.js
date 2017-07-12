import * as xview from './xview/Common';

export const haveWechatApp=(fncallback)=>{
  xview.haveWechatApp((data)=>{
    fncallback(data);
  });
}


export const loginQQ = (fncallback)=>{
    xview.loginToTencentQQ((result)=>{
      if(typeof result === 'string'){
          result = JSON.parse(result);
      }
      //alert(JSON.stringify(result));
      fncallback(result);
    });
  }


  export const loginWx=(fncallback)=>{
    xview.loginToWeixin((result)=>{
      if(typeof result === 'string'){
          result = JSON.parse(result);
      }
      //alert(JSON.stringify(result));
      fncallback(result);
    });
  }
