import * as xview from './xview/Common';

export const loginQQ = (fncallback)=>{
    xview.loginToTencentQQ((data)=>{
      fncallback(data);
    });
  }


  export const loginWx=(fncallback)=>{
    xview.loginToWeixin((data)=>{
      fncallback(data);
    });
  }
