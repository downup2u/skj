import React, { Component, PropTypes } from 'react';
import '../../public/css/user.css';
import '../../public/css/newtopic.css';
import { Input, List, Radio, Button, Icon, Image, TextArea,Label} from 'semantic-ui-react';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
import {inserttopic_request} from '../actions/index.js';
import PicturesWall  from './controls/pictureswall.js';
import NavBar from './nav.js';
import {inserttopic} from '../actions/sagacallback.js';

let renderNewtopicForm = (fields)=> {
    console.dir(fields);
    return (
        <div className='loginform newtopic'>
            <div className="newtopicinput">
                <TextArea placeholder='输入帖子内容' {...fields.title.input} type="text"/>
            </div>
            {fields.title.meta.touched && fields.title.meta.error &&
            <Label basic color='red' pointing>{fields.title.meta.error}</Label>}
            <PicturesWall {...fields.picurl.input} />
        </div>
    );
}
renderNewtopicForm = connect()(renderNewtopicForm);

let NewtopicForm = (props)=> {
    let {handleSubmit,onClickNewTopic} = props;
    return (<Form onSubmit={handleSubmit(onClickNewTopic)}>
        <div className="loginPageTop">
            <Fields names={['title','picurl']} component={renderNewtopicForm}/>
            <div className="loginBotton newtopicbtn">
                <Button primary>发布</Button>
            </div>
        </div>
    </Form>);
};

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = '写点什么吧';
    }
    return errors;
}

NewtopicForm = reduxForm({
    form: 'newtopic',
    validate,
    initialValues: {
        title: '',
        picurl: [],
    }
})(NewtopicForm);


import {login_request} from '../actions/index.js';
export class Page extends React.Component {

    componentWillMount() {
    }

    onClickNewTopic = (values)=> {
        console.dir(values);

        let payload = {
            title: values.title,
            picurl: values.picurl,
        }
        //alert(JSON.stringify(formdata));
        // this.props.dispatch(inserttopic_request(payload));
        this.props.dispatch(inserttopic(payload)).then((result)=> {
            console.log("新建帖子成功:" + JSON.stringify(result));
            this.props.history.goBack();
        }).catch((error)=> {
            //弹出错误框
            console.log("新建帖子失败:" + JSON.stringify(error));
        });
    }
    onClickReturn = ()=> {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <NavBar lefttitle="返回" title="发布帖子" onClickLeft={this.onClickReturn}/>
                <NewtopicForm onClickNewTopic={this.onClickNewTopic}/>
            </div>
        );
    }

}


Page = connect()(Page);
export default Page;
