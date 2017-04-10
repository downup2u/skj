/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import '../../../public/css/mymessage.css';
import NavBar from '../nav.js';


export class Page extends React.Component {

    componentWillMount() {
    }

    onClickBack() {
        this.props.history.goBack();
    }

    componentWillUnmount() {

    }

    render() {
        const {notifymessageitem} = this.props;
        if (typeof notifymessageitem.created_at === 'string') {
            notifymessageitem.created_at = new Date(Date.parse(notifymessageitem.created_at));
        }
        return (
            <div className="messageDetail">
                <NavBar lefttitle="返回" title="消息详情" onClickLeft={this.onClickBack.bind(this)} />
                <div className="tt">{notifymessageitem.messagetitle}</div>
                <div className="time">
                    <span>{moment(notifymessageitem.created_at).format("MM月DD日 HH时mm分")}</span>
                </div>
                <div className="cont">{notifymessageitem.messagecontent}</div>
            </div>
        );
    }
}


const mapStateToProps = ({notifymessage}, props) => {
    let msgid = props.match.params.msgid;
    let notifymessageitem = notifymessage.mynotifymessages;
    return {notifymessageitem};
};

export default connect(
    mapStateToProps,
)(Page);
