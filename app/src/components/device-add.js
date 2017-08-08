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
        </div>
    );
};

let WifiForm = (props)=>{
    let {handleSubmit,onClickNext,code} = props;
    return (
        <Form onSubmit={handleSubmit(onClickNext)}>
            <div className="tt">
                <img src="img/6.png"/>
            </div>
            <Fields names={['ssid','password']}  component={renderWifiForm}/>
            <div className="loginBotton">
                {code==='0' ? <Button primary>下一步</Button>:<Button primary>刷新</Button>}
            </div>
        </Form>
    );
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
    onClickRefresh = ()=>{
      this.props.dispatch(getcurwifi_request({}));
    }
    componentWillMount() {
        this.onClickRefresh();
    }
    onClickReturn = ()=> {
        this.props.history.goBack();
    }
    onClickNext =(values)=>{
        if(this.props.code === '0'){
          this.props.dispatch(getcurwifi_devicelist_request(values));
        }
        else{
          this.onClickRefresh();
        }
    }
    render(){
        const {ssid,code} = this.props;
        let formvalue = {
            ssid:ssid,
            password:'',
        };
        return (
            <div className="addnewdevice" style={{height: window.innerHeight+"px"}}>
                <NavBar back={true} title="设备连接" style={{backgroundImage:"linear-gradient(0deg, #0090d8, #0090d8)"}}/>
                <WifiSelForm formname="wifiform" formvalues={formvalue} 
                onClickNext={this.onClickNext} code={code}/>
            </div>
        );
    }
}

const mapStateToProps = ({wifi}) => {
    return {...wifi};
}
Page = connect(mapStateToProps)(Page);
export default Page;
