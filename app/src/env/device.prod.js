import * as xview from './xview/Common';


export const getssid = (fncallback)=>{
  //  fncallback({
  //      ssid:'101372126',
  //  });
  try{
    if(!!xview){
      xview.currentLinkWifi((data)=>{
        try{
          if(typeof data === 'string'){
              data = JSON.parse(data);
          }


          fncallback(data);
        }
        catch(e){
          alert(`获取当前wifi信息失败了${e}`);
        }
       //  alert(JSON.stringify(data));
      });
    }
  }
  catch(e){
    console.log(e);
  }
}


export const senddata = (values,fncallback)=>{
  //alert(`开始调用xview.prepareEasyLink方法,参数:${JSON.stringify(values)}`);
  try{
    if(!!xview){
      xview.prepareEasyLink(values,(data)=>{
        try{
          if(typeof data === 'string'){
              data = JSON.parse(data);
          }
          

          fncallback(data);
        }
        catch(e){
          alert(`获取数据信息失败了${e}`);
        }
        // alert(JSON.stringify(data));
      });
    }
  }
  catch(e){
    console.log(e);
  }
  /*
  values期望格式：ssid，password
  */
  // console.log(`values:${JSON.stringify(values)}`);
  // let retjson = {
  //   code:0,
  //   messgae:'获取成功',
  //   data:[
  //     {
  //       name:'Wi-Fi模块1',
  //       mac:'08:00:20:0A:8C:6D',
  //       ip:'192.168.9.3'
  //     },
  //     {
  //       name:'Wi-Fi模块2',
  //       mac:'08:00:20:0A:8C:4D',
  //       ip:'192.168.9.4'
  //     },
  //   ]
  // };
  // fncallback(retjson);
};
