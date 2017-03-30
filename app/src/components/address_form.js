import React,{ Component, PropTypes } from 'react';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import {  Button, Icon, Input, List, Radio, Label, Checkbox } from 'semantic-ui-react';
import 'iosselect/src/iosSelect.css';
import IosSelect from 'iosselect';
import {iosProvinces,iosCitys,iosCountys} from '../areaData_v2.js';
import { Segment } from 'semantic-ui-react';
//地址下拉框输入格式定义:
// seladdr:{
//   selprovice:{
//     {'id': '320000', 'value': '江苏省'},
//   },
//   selcity:{
//     {"id":"320100","value":"南京市"},
//   },
//   seldistict:{
//     {"id":"320105","value":"建邺区"},
//   }
// }
let renderNewaddressForm = (fields)=> {
  let addrsel = fields.seladdr.input.value;
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
                      let addrselvalue = {
                        selprovice:{
                            id: '320000',
                            value: '江苏省',
                          },
                          selcity:{
                              id:"320100",
                              value:"南京市",
                          },
                          seldistict:{
                            id:"320105",
                            value:"建邺区",
                          }
                      };
                      addrselvalue.selprovice.id = selectOneObj.id;
                      addrselvalue.selprovice.value = selectOneObj.value;
                      addrselvalue.selcity.id = selectTwoObj.id;
                      addrselvalue.selcity.value = selectTwoObj.value;
                      addrselvalue.seldistict.id = selectThreeObj.id;
                      addrselvalue.seldistict.value = selectThreeObj.value;
                      fields.seladdr.input.onChange(addrselvalue);
                      //console.log(selectOneObj);
                  }
              });
      };
    return (
        <div className="AddressAddPage" style={{minHeight:(window.innerHeight-46)+"px"}}>
            <List selection verticalAlign='middle' className="addAddress">
                <List.Item>
                    <div className="tit">姓名:</div>
                    <List.Content>
                        <Input {...fields.truename.input} placeholder='请填写收货人姓名'/>
                        {fields.truename.meta.touched && fields.truename.meta.error &&
                        <Label basic color='red' pointing>{fields.truename.meta.error}</Label>}
                    </List.Content>
                </List.Item>
                <List.Item>
                    <div className="tit">手机号码:</div>
                    <List.Content>
                        <Input  {...fields.phonenumber.input} placeholder='请填写收货人手机号'/>
                        {fields.phonenumber.meta.touched && fields.phonenumber.meta.error &&
                        <Label basic color='red' pointing>{fields.phonenumber.meta.error}</Label>}
                    </List.Content>
                </List.Item>
                <List.Item>
                    <Segment.Group horizontal onClick={setOption}>
                      <Segment>{addrsel.selprovice.value}</Segment>
                      <Segment>{addrsel.selcity.value}</Segment>
                      <Segment>{addrsel.seldistict.value}</Segment>
                    </Segment.Group>
                </List.Item>
                <List.Item>
                    <div className="tit">详细地址:</div>
                    <List.Content>
                        <Input  {...fields.addressname.input} placeholder='请填写详细地址方便送达'/>
                        {fields.addressname.meta.touched && fields.addressname.meta.error &&
                        <Label basic color='red' pointing>{fields.addressname.meta.error}</Label>}
                    </List.Content>
                </List.Item>
            </List>

            <div className="setForm">
                <span>是否设为默认地址</span>
                <Radio toggle label=''/>
            </div>
        </div>);
};


const validate = values => {
    const errors = {}
    if (!values.truename) {
        errors.truename = '必须填写收货人';
    }

    if (!values.phonenumber) {
        errors.phonenumber = '必须填写手机号';
    }
    else {
        let phone = values.phonenumber;
        phone = phone.replace(/\s/g, '');
        if (phone.match(/\D/g) || phone.length !== 11 || !phone.match(/^1/)) {
            errors.phonenumber = '无效的手机号码';
        }
    }

    if (!values.addressname) {
        errors.addressname = '必须填写详细地址';
    }
    return errors;
}

let NewaddressForm = (props)=> {
    let {handleSubmit,onClickOK} = props;
    return (<Form onSubmit={handleSubmit(onClickOK)}>
        <div className="loginPageTop">
            <Fields names={['truename','phonenumber','seladdr','addressname']}
                    component={renderNewaddressForm}/>

            <div className="loginBotton AddressAddPageBottom">
                <Button primary>确定</Button>
            </div>
        </div>
    </Form>);
};

let AddressForm = ({formname,formvalues,...rest})=> {

    let FormWrap = reduxForm({
        form: formname,
        validate,
        initialValues: formvalues
    })(NewaddressForm);

    return <FormWrap {...rest} />
}

export default AddressForm;
