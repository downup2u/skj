import * as xview from './xview/Common';

export const shareQQ=(sourceData,fncallback)=>{
    try{
      xview.shareToTencentQQZoneUrl(sourceData,fncallback);
    }
    catch(e){
      console.log(e);
    }
  }

export const shareQQFriend=(sourceData,fncallback)=>{
    try{
      xview.shareToTencentQQUrl(sourceData,fncallback);
    }
    catch(e){
      console.log(e);
    }
  }

export const shareWechatCircle=(sourceData,fncallback)=>{
    try{
      xview.shareToWeixinCircleUrl(sourceData,fncallback);
    }
    catch(e){
      console.log(e);
    }
  }

export const shareWechatFriend=(sourceData,fncallback)=>{
    try{
      xview.shareToWeixinFriendUrl(sourceData,fncallback);
    }
    catch(e){
      console.log(e);
    }
  }
