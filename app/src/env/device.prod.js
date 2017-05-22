import * as xview from './xview/Common';


export const getssid = (fncallback)=>{
  //  fncallback({
  //      ssid:'101372126',
  //  });
   xview.currentLinkWifi((data)=>{
     alert(JSON.stringify(data));
     fncallback(data);
   });
}


export const senddata = (values,fncallback)=>{
  xview.currentLinkWifi(values,(data)=>{
    alert(JSON.stringify(data));
    fncallback(data);
  });
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
