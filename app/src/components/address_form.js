import React,{ Component } from 'react';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import {  Button, Icon, Input, List, Radio, Label, Checkbox } from 'semantic-ui-react';
import Addresssellevel3 from './controls/addresssellevel3';

let renderNewaddressForm = (fields)=> {
    let onClickDefault =()=>{
        fields.isdefaultaddress.input.onChange(true);
    }
    return (
        <div className="AddressAddPage" style={{height:(window.innerHeight-46)+"px"}}>
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
                    <div className="tit">选择地区:</div>
                    <Addresssellevel3 {...fields.seladdr.input} />
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
                {
                    !fields.isdefaultaddress.input.value?
                    (
                        <div>
                            <span>是否设为默认地址</span>
                            <Checkbox onClick={onClickDefault} checked={false} />
                        </div>
                    ):(
                        <div>
                            <span>当前为默认地址</span>
                            <Checkbox disabled checked={true} />
                        </div>
                    )
                }
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
    return (
        <Form onSubmit={handleSubmit(onClickOK)}>
            <Fields names={['truename','phonenumber','seladdr','addressname','isdefaultaddress']}
                    component={renderNewaddressForm}/>

            <div className="loginBotton AddressAddPageBottom">
                <Button primary>确定</Button>
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
