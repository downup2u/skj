import React,{ Component, PropTypes } from 'react';
import 'iosselect/src/iosSelect.css';
import IosSelect from 'iosselect';
import { Segment } from 'semantic-ui-react';
import {iosProvinces,iosCitys,iosCountys,defaultaddrselvalue} from '../../areaData_v2.js';

let Addresssellevel3 = (props)=>{
  let addrsel = props.value;
  console.log("addrsel=====>" + JSON.stringify(addrsel));
  let setOption=(e)=>{
          let temperatureSelect = new IosSelect(3,
              [iosProvinces, iosCitys, iosCountys],
              {
                title: '地址选择',
                itemHeight: 35,
                relation: [1, 1, 0, 0],
                oneLevelId: addrsel.selprovice.id,
                twoLevelId: addrsel.selcity.id,
                threeLevelId: addrsel.seldistict.id,
                callback: (selectOneObj, selectTwoObj, selectThreeObj)=> {
                      let addrselvalue = defaultaddrselvalue;
                      addrselvalue.selprovice.id = selectOneObj.id;
                      addrselvalue.selprovice.value = selectOneObj.value;
                      addrselvalue.selcity.id = selectTwoObj.id;
                      addrselvalue.selcity.value = selectTwoObj.value;
                      addrselvalue.seldistict.id = selectThreeObj.id;
                      addrselvalue.seldistict.value = selectThreeObj.value;
                      let addrselvaluenew = {
                        selprovice:{...addrselvalue.selprovice},
                        selcity:{...addrselvalue.selcity},
                        seldistict:{...addrselvalue.seldistict},
                      }
                      props.onChange(addrselvaluenew);
                      //console.log(selectOneObj);
                      console.log("addrselvalue=====>" + JSON.stringify(addrselvaluenew));
                  }
              });
      };

      return ( <Segment.Group horizontal onClick={setOption}>
                            <Segment>{addrsel.selprovice.value}</Segment>
                            <Segment>{addrsel.selcity.value}</Segment>
                            <Segment>{addrsel.seldistict.value}</Segment>
                          </Segment.Group>);
};

export default Addresssellevel3;
