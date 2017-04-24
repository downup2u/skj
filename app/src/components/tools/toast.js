import React, { Component, PropTypes } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import './myweui.css';
import { connect } from 'react-redux';
import { set_weui } from '../../actions/index.js';
const { Toast } = WeUI;

export class Page extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.toast.show && !this.props.toast.show) {
            window.setTimeout(()=> {
                let toast = {
                    show : false,
                    text : "",
                    type : ""
                }
                this.props.dispatch(set_weui({ toast }));
            }, 1500);
        }
    }

    render(){
        let icon = {
            "warning" : "warn",
            "success" : "success-no-circle",
            "loading" : "loading"
        }
        return (
            <Toast 
                icon={icon[this.props.toast.type]}
                show={this.props.toast.show}
                >
                {this.props.toast.text}
            </Toast>
        )
    }

}

let data =  ({weui:{toast}}) =>{
    return { toast };
};

Page = connect(data)(Page);

export default Page;


