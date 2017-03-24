import React, { Component, PropTypes } from 'react';
import NavBar from './nav.js';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
import { Input, Button, Select } from 'semantic-ui-react';
import '../../public/css/newdevice.css';
import {getwifilist_request} from '../actions';

let renderWifiForm = (fields)=>{
     let onChangeSel = (e,newdata)=>{
         if(fields.wifilist.length > newdata.value) {
             let newvalue = fields.wifilist[newdata.value];
             newvalue.index = newdata.value;
             fields.selwifi.input.onChange(newvalue);
         }
    }

    if(fields.wifilist.length > 0 && fields.selwifi.input.value === -1){
        window.setTimeout(()=>{
            let newvalue = fields.wifilist[0];
            newvalue.index = 0;
            fields.selwifi.input.onChange(newvalue);
        },0);

    }
    if(fields.selwifi.input.value === -1){
        return <div>loading...</div>;
    }
    let defaultvalue = fields.selwifi.input.value.index;
    return (
             <div className="fm">
            <div className="input">
            <Select options={fields.wifilistoptions} onChange={onChangeSel} defaultValue={defaultvalue}/>
             <img src="img/8.png" />
            </div>
            <div className="input">
            <Input placeholder='请输入网络密码' value={fields.password.input.value} onChange={fields.password.input.onChange}/>
            <img src="img/7.png" />
            </div>
        </div>);
};

const mapStateToProps = ({wifi}) => {
    let wifilistoptions = [];
    const {wifilist} = wifi;
    wifilist.forEach((wifi,index)=>{
        wifilistoptions.push({
            key: index,
            value: index,
            flag: 'af', //变成wifi图标？？？
            text: wifi.ssid,
        });
    });
    return {wifilistoptions,wifilist};
}
renderWifiForm = connect(mapStateToProps)(renderWifiForm);

let WifiForm = (props)=>{
    let {handleSubmit,onClickNext} = props;
    return (<Form onSubmit={handleSubmit(onClickNext)}>

        <div className="tt">
        <img src="img/6.png"/>
        </div>

        <Fields names={['selwifi','password']}  component={renderWifiForm}/>

        <div className="loginBotton">
        <Button primary>下一步</Button>
        </div>

    </Form>);
};

const validate = values => {
    const errors = {}
    if (!values.password) {
        errors.password = '密码不能为空';
    }
    return errors;
}

let WifiSelForm =({formname,formvalues,...rest})=>{

    let FormWrap = reduxForm({
        form: formname,
        validate,
        initialValues:formvalues
    })(WifiForm);

    return <FormWrap {...rest} />
}

class Page extends React.Component {
    componentWillMount() {
        this.props.dispatch(getwifilist_request());
    }
    onClickReturn = ()=> {
        this.props.history.goBack();
    }
    onClickNext =(values)=>{
        console.log("----->onclicknext:" + JSON.stringify((values)));
        this.props.history.push('/addnewdevice2');
    }

    render(){
        let formvalue = {
            selwifi:-1,
            password:''
        };
        return (
            <div className="addnewdevice">
            <NavBar lefttitle="返回" title="设备连接" onClickLeft={this.onClickReturn}/>
            <WifiSelForm formname="wifiform" formvalues={formvalue} onClickNext={this.onClickNext}/>
        </div>
    );

    }

}

Page = connect()(Page);
export default Page
