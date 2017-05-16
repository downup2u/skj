import React, { Component } from 'react';
import NavBar from './newnav.js';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
import { Input, Button, Select } from 'semantic-ui-react';
import '../../public/css/newdevice.css';
import {getcurwifi_request,getcurwifi_devicelist_request} from '../actions';
import {senddata} from '../env/device.js';

let renderWifiForm = (fields)=>{
    return (
            <div className="fm">
            <div className="input">
            <Input placeholder='请输入网络密码' value={fields.ssid.input.value} onChange={fields.ssid.input.onChange}/>
             <img src="img/8.png" />
            </div>
            <div className="input">
            <Input placeholder='请输入网络密码' value={fields.password.input.value} onChange={fields.password.input.onChange}/>
            <img src="img/7.png" />
            </div>
        </div>);
};


let WifiForm = (props)=>{
    let {handleSubmit,onClickNext} = props;
    return (<Form onSubmit={handleSubmit(onClickNext)}>

        <div className="tt">
        <img src="img/6.png"/>
        </div>

        <Fields names={['ssid','password']}  component={renderWifiForm}/>

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
        this.props.dispatch(getcurwifi_request({}));
    }
    onClickReturn = ()=> {
        this.props.history.goBack();
    }
    onClickNext =(values)=>{
        console.log("----->onclicknext:" + JSON.stringify((values)));
        this.props.dispatch(getcurwifi_devicelist_request(values));
        //this.props.history.push('/addnewdevice2');
    }

    render(){
        const {ssid} = this.props;
        let formvalue = {
            ssid:ssid,
            password:''
        };
        return (
            <div className="addnewdevice">
            <NavBar back={true} title="设备连接" />
            <WifiSelForm formname="wifiform" formvalues={formvalue} onClickNext={this.onClickNext}/>
        </div>
    );

    }

}

const mapStateToProps = ({wifi}) => {
    return {...wifi};
}
Page = connect(mapStateToProps)(Page);
export default Page;
