// let sourceData={"title":"夏恒网络XVIEW分享", "descrption":"夏恒网络XVIEW分享。", "picture":"https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2378550344,2476789148&fm=58", "url":"http://www.xiaheng.net/"};

export const shareQQ=(sourceData,fncallback)=>{
  console.log('shareQQ:' + JSON.stringify(sourceData));
  fncallback({
     code:0,
  });
};

export const shareQQFriend=(sourceData,fncallback)=>{
  console.log('shareQQFriend:' + JSON.stringify(sourceData));
    fncallback({
     code:0,
  });
};

export const shareWechatCircle=(sourceData,fncallback)=>{
  console.log('shareWechatCircle:' + JSON.stringify(sourceData));
    fncallback({
     code:0,
  });
    //xview.shareToWeixinCircleUrl(sourceData,fncallback);
  }

export const shareWechatFriend=(sourceData,fncallback)=>{
  console.log('shareWechatFriend:' + JSON.stringify(sourceData));
    fncallback({
     code:0,
  });
    //xview.shareToWeixinFriendUrl(sourceData,fncallback);
  }