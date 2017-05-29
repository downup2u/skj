/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import '../../../public/css/mymessage.css';
import NavBar from '../nav.js';
import { getnotifymessageone_request } from '../../actions';

export class Page extends React.Component {

    componentWillMount() {
      const msgid = this.props.match.params.msgid;
      this.props.dispatch(getnotifymessageone_request({_id:msgid}));
    }

    onClickBack() {
        this.props.history.goBack();
    }

    componentWillUnmount() {

    }

    render() {
        const {notifymessageitem} = this.props;
        if(notifymessageitem.hasOwnProperty('_id')){
          if (typeof notifymessageitem.created_at === 'string') {
              notifymessageitem.created_at = new Date(Date.parse(notifymessageitem.created_at));
          }
        }

        return (
            <div className="messageDetail">
                <NavBar lefttitle="返回" title="消息详情" onClickLeft={this.onClickBack.bind(this)} />
                {notifymessageitem.hasOwnProperty('_id')?
                (
                  <div>
                  <div className="tt">{notifymessageitem.messagetitle}</div>
                  <div className="time">
                      <span>{moment(notifymessageitem.created_at).format("MM月DD日 HH时mm分")}</span>
                  </div>
                  <div className="cont">{notifymessageitem.messagecontent}</div>
                  </div>
              ):(<div>加载中，请稍后</div>)}
            </div>
        );
    }
}


const mapStateToProps = ({notifymessage:{notifymessageitem}}) => {
    return {notifymessageitem};
};

export default connect(
    mapStateToProps,
)(Page);
