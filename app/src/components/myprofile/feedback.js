import React, { Component, PropTypes } from 'react';
import '../../../public/css/user.css';
import '../../../public/css/newtopic.css';
import { Input, List, Radio, Button, Icon, Image, TextArea, Label } from 'semantic-ui-react';
import { Field, Fields, reduxForm, Form  } from 'redux-form';
import PicturesWall from '../controls/pictureswall.js';
import NavBar from '../newnav.js';
import { connect } from 'react-redux';
import { feedbackaddone } from '../../actions/sagacallback.js';
import { showpopmessage } from '../../actions';

let renderNewFeedbackForm = (fields)=> {
    console.dir(fields);
    return (
        <div className='loginform newtopic'>
            <div className="newtopicinput">
                <TextArea placeholder='提出您的宝贵意见' {...fields.feedbacktxt.input} type="text"/>
            </div>
            {fields.feedbacktxt.meta.touched && fields.feedbacktxt.meta.error &&
            <Label basic color='red' pointing>{fields.feedbacktxt.meta.error}</Label>}
            <PicturesWall {...fields.picurl.input} />
        </div>
    );
}
renderNewFeedbackForm = connect()(renderNewFeedbackForm);

let NewtopicForm = (props)=> {
    let {handleSubmit,onClickNewTopic} = props;
    return (<Form onSubmit={handleSubmit(onClickNewTopic)}>
        <div className="loginPageTop">
            <Fields names={['feedbacktxt','picurl']} component={renderNewFeedbackForm}/>
            <div className="loginBotton newtopicbtn">
                <Button primary>确定</Button>
            </div>
        </div>
    </Form>);
};

const validate = values => {
    const errors = {}
    if (!values.feedbacktxt) {
        errors.feedbacktxt = '写点什么吧';
    }
    return errors;
}

NewtopicForm = reduxForm({
    form: 'newfeedback',
    validate,
    initialValues: {
        feedbacktxt: '',
        picurl: [],
    }
})(NewtopicForm);

export class Page extends React.Component {

    componentWillMount() {
    }
    //反馈意见
    onClickFeedBack = (values)=> {
        let payload = {
            feedbacktxt: values.feedbacktxt,
            picurl: values.picurl,
        }
        this.props.dispatch(feedbackaddone(payload)).then((result)=>{
            if(result.hasOwnProperty('newitem')){
                // alert("感谢您的宝贵意见");
                this.props.dispatch((showpopmessage({
                    title: '',
                    msg: '感谢您的宝贵意见',
                    type: 'success'
                })))
                this.onClickReturn();
            }
        });
    }
    //返回
    onClickReturn = ()=> {
        this.props.history.goBack();
    }
    render() {
        return (
            <div className="feedPage">
                <NavBar back={true} title="意见反馈" />
                <NewtopicForm onClickNewTopic={this.onClickFeedBack}/>
            </div>
        );
    }

}

export default Page;
