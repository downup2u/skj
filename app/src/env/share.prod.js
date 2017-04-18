import * as xview from './xview/Common';

export const shareQQ=(sourceData,fncallback)=>{
    xview.shareToTencentQQZoneUrl(sourceData,fncallback);
  }

export const shareQQFriend=(sourceData,fncallback)=>{
    xview.shareToTencentQQUrl(sourceData,fncallback);
  }

export const shareWechatCircle=(sourceData,fncallback)=>{
    xview.shareToWeixinCircleUrl(sourceData,fncallback);
  }

export const shareWechatFriend=(sourceData,fncallback)=>{
    xview.shareToWeixinFriendUrl(sourceData,fncallback);
  }