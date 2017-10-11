const _ = require('lodash');
const config = require('../../config.js');
const winston = require('../log/log.js');

let parseBufData0 = (buf)=>{
  let deviceconfig = config.deviceconfig;
  // data0	 	原水流量数	原水流量数高8位
  // data1	 	原水流量数	原水流量数低8位
  // data2	 	净水流量数	原水流量数高8位
  // data3	 	净水流量数	净水流量数低8位
  // data4	 	原水TDS	原水TDS字节高8位
  // data5	 	原水TDS	原水TDS字节低8位
  // data6	 	净水TDS	净水TDS字节高8位
  // data7	 	净水TDS	净水TDS字节低8位
  // data8	 	5微米pp滤芯已用天数	5微米pp滤芯已用天数高8位
  // data9	 	5微米pp滤芯已用天数	5微米pp滤芯已用天数低8位
  // data10	 	颗粒活性炭已用天数	颗粒活性炭已用天数高8位
  // data11	 	颗粒活性炭已用天数	颗粒活性炭已用天数低8位
  // data12	 	1微米pp滤芯已用天数	1微米pp滤芯已用天数高8位
  // data13	 	1微米pp滤芯已用天数	1微米pp滤芯已用天数低8位
  // data14	 	反渗透RO膜已用天数	反渗透RO膜已用天数高8位
  // data15	 	反渗透RO膜已用天数	反渗透RO膜已用天数低8位
  // data16	 	后置活性炭已用天数	后置活性炭已用天数高8位
  // data17	 	后置活性炭已用天数	后置活性炭已用天数低8位
  let data01 = (buf[0] << 8) + buf[1];//原水流量数
  let data23 = (buf[2] << 8) + buf[3];//净水流量数

  let total =  data23;

  let dts0 = (buf[4] << 8) + buf[5];//原水TDS
  let dts1 = (buf[6] << 8) + buf[7];//净水TDS

  let data89 =   (buf[8] << 8) + buf[9];///5微米pp滤芯已用天数
  let data1011 = (buf[10] << 8) + buf[11];///颗粒活性炭已用天数
  let data1213 = (buf[12] << 8) + buf[13];///1微米pp滤芯已用天数
  let data1415 = (buf[14] << 8) + buf[15];///反渗透RO膜已用天数
  let data1617 = (buf[16] << 8) + buf[17];///后置活性炭已用天数

  const systotal89 = deviceconfig.systotal89;
  const systotal1011 = deviceconfig.systotal1011;
  const systotal1213 = deviceconfig.systotal1213;
  const systotal1415 = deviceconfig.systotal1415;
  const systotal1617 = deviceconfig.systotal1617;

  let greaterzero = (v)=>{
    return v > 0 ? v :0;
  }
  let left89 = greaterzero(systotal89 - data89);
  let left1011 = greaterzero(systotal1011 - data1011);
  let left1213 = greaterzero(systotal1213 - data1213);
  let left1415 = greaterzero(systotal1415 - data1415);
  let left1617 = greaterzero(systotal1617 - data1617);


  let getpecentnumber = (v)=>{
    return v.toFixed();
  };

  let getgrade=(v,config)=>{
      let configsz = [];
      _.map(config,(value,name)=>{
        configsz.push({name,value});
      });
      console.log(`配置文件：${JSON.stringify(configsz)}\n`);
      configsz = _.orderBy(configsz, ['value'], ['asc']);
      console.log(`配置文件(排序后)：${JSON.stringify(configsz)}\n`);
      const length = configsz.length;
      if(length > 0){
        if(v < configsz[0].value){
          console.log(`结果${v},对应==>太少了,都不够配置\n`);
          winston.getlog().error(`结果${v},对应==>太少了,都不够配置,配置文件(排序后)：${JSON.stringify(configsz)}\n`);
          return '无';
        }
      }
      else{
        console.log(`结果${v},无配置\n`);
        return '无配置';
      }
      let retname = configsz[0].name;
      _.map(configsz,(item,index)=>{
        if(v >= item.value){
          retname = item.name;
        }
      });
      return retname;
  };

  let leftpecent89 = getpecentnumber(data89*100/systotal89);
  let leftpecent1011 = getpecentnumber(data1011*100/systotal1011);
  let leftpecent1213 = getpecentnumber(data1213*100/systotal1213);
  let leftpecent1415 = getpecentnumber(data1415*100/systotal1415);
  let leftpecent1617 = getpecentnumber(data1617*100/systotal1617);
  let iswatercut = buf[18] === 0x01?true:false;
  let devicedata =
  {
      rawdata:{
        data01,//原水流量数
        data23,//净水流量数
        dts0,//原水TDS
        dts1,//净水TDS
        data89,///5微米pp滤芯已用天数
        data1011,///颗粒活性炭已用天数
        data1213,///1微米pp滤芯已用天数
        data1415,//反渗透RO膜已用天数
        data1617,//后置活性炭已用天数
      },
      iswatercut,
      name:getgrade(total,deviceconfig.graderight),
      total:`${total}`,
      modeltype:'',
      leftmodel:{
          name:`原水TDS-${dts0}`,
          resultstring:getgrade(dts0,deviceconfig.gradeleft),
      },
      rightmodel:{
          name:`净水TDS-${dts1}`,
          resultstring:getgrade(dts1,deviceconfig.graderight),
      },
      detaillist:
          [
              {
                  name:'5微米PP滤芯',
                  leftday:`${left89}`,
                  leftpecent:`${leftpecent89}`,
              },
              {
                  name:'颗粒活性炭',
                  leftday:`${left1011}`,
                  leftpecent:`${leftpecent1011}`,
              },
              {
                  name:'1微米PP滤芯',
                  leftday:`${left1213}`,
                  leftpecent:`${leftpecent1213}`,
                },
              {
                  name:'反渗透RO膜',
                  leftday:`${left1415}`,
                  leftpecent:`${leftpecent1415}`,
                },
              {
                  name:'后置活性炭',
                  leftday:`${left1617}`,
                  leftpecent:`${leftpecent1617}`,
                },

          ],
  };
  return devicedata;
}


module.exports= parseBufData0;
//
// let deviceconfig = {
//   gradetotal:{
//     '优':100,
//     '良':90,
//     '差':32,
//     '不要太好':320,
//   },
//   gradeleft:{
//     '不健康':29,
//     '一般健康':290,
//     '非常健康':2900,
//     '可直饮':10000,
//     '一般':500,
//   },
//   graderight:{
//     '不健康':29,
//     '一般健康':290,
//     '非常健康':2900,
//     '可直饮':10000,
//     '一般':500,
//   },
//    systotal89:100,
//    systotal1011:100,
//    systotal1213:100,
//    systotal1415:100,
//    systotal1617:100,
// };

// let retdata = parseBufData(null,deviceconfig);
// console.log(`${JSON.stringify(retdata)}`);
