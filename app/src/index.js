import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/index.js';
import Register from './components/register.js';
import Login from './components/login.js';
import Addresslist from './components/address_list.js';
import AddressAdd from './components/address-add.js';
import AddressEdit from './components/address-edit.js';
import Userinfo from './components/user-info.js';
import ProfileDetail from './components/profiledetail.js';
import { TransitionMotion, spring } from 'react-motion';
import Devicelist from './components/devicelist.js';
import NewDevice from './components/newdevice.js';
import Community from './components/community.js';
import Communityinfo from './components/community-info.js';
import {requireAuthentication} from './components/requireauthentication';

import {DevTools,store} from './store';

import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


const styles = {}

styles.fill = {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width:"100%"
}

styles.content = {
    ...styles.fill,
    top: '40px',
    textAlign: 'center'
}

styles.nav = {
    padding: 0,
    margin: 0,
    position: 'absolute',
    top: 0,
    height: '40px',
    width: '100%',
    display: 'flex'
}

styles.navItem = {
    textAlign: 'center',
    flex: 1,
    listStyleType: 'none',
    padding: '10px'
}

styles.hsl  = {
    ...styles.fill,
    color: 'white',
    paddingTop: '20px',
    fontSize: '30px'
}

const FadeRoute = ({ component: Component, ...rest }) => {
    const movelength = 300;
    let pagefirst = true;
    let willLeave = (movelength) => ({ zIndex: 1, left: spring(-movelength) });
    let renderChildren = (props)=>{
        let location = props.location;
        let history = props.history;
        let match = props.match;
        let movelength = 300;
        if(history.action === 'PUSH'){
          movelength = 300;//弹出页面
        }
        else if(history.action === 'POP'){
          movelength = -300;//返回页面
        }
        let prvleft = movelength;
        return (<TransitionMotion
        willLeave={()=>{willLeave(movelength)}}
        styles={match ? [ {
          key: location.pathname,
          style: { left: 0, x : 1,zIndex:2},
          data: match
        } ] : []}
      >
        {interpolatedStyles => (
          <div>
            {interpolatedStyles.map(config => {
                let x = config.style.x? (prvleft+movelength):config.style.left;
                if(!config.style.x){
                    pagefirst = false;
                    prvleft = config.style.left;
                }
                if(pagefirst){
                    x = 0
                }

                return (
                  <div
                    key={config.key}
                    style={{
                        ...styles.fill,
                        ...config.style,
                        left: `${x}px`,
                       }}
                  >
                    <Component {...config.data} {...props}/>
                  </div>
                )}
            )}
          </div>
        )}
      </TransitionMotion>
    );
  };

    return (
        <Route {...rest} children={renderChildren} />
    )
}

import NewTopic from './components/newtopic.js';
const CoApp = (props) => {
  let CustomRoute = Route;
  return (
    <Switch>
      <CustomRoute exact path="/" component={App}/>
      <CustomRoute path="/login" component={Login}/>
      <CustomRoute path="/register" component={Register}/>
      <CustomRoute path="/addresslist" component={requireAuthentication(Addresslist)}/>
      <CustomRoute path="/newaddress" component={requireAuthentication(AddressAdd)}/>
      <CustomRoute path="/editaddress/:addressid" component={requireAuthentication(AddressEdit)}/>
      <CustomRoute path="/userinfo" component={Userinfo}/>
      <CustomRoute path="/profiledetail" component={requireAuthentication(ProfileDetail)}/>
      <CustomRoute path="/newtopic" component={requireAuthentication(NewTopic)}/>
      <CustomRoute path="/devicelist" component={requireAuthentication(Devicelist)}/>
      <CustomRoute path="/newdevice" component={requireAuthentication(NewDevice)}/>
      <CustomRoute path="/communityinfo/:topicid" component={Communityinfo}/>
      <CustomRoute component={App}/>
    </Switch>
    );
}

import {hidepopmessage} from './actions/index.js';
import { Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

export class AppRoot extends React.Component {
  onDismiss=()=>{
    this.props.dispatch(hidepopmessage());
  }
  componentWillMount () {
  }
  render() {
    let MessageCo = null;
    if(this.props.ispop){
      if(this.props.type === 'error'){
        MessageCo =  <Message onDismiss={this.onDismiss}
            error
            header={this.props.title}
            content={this.props.msg}
          />;
      }
      else if(this.props.type === 'warning'){
      MessageCo =  <Message onDismiss={this.onDismiss}
          warning
          header={this.props.title}
          content={this.props.msg}
        />;
      }
      else if(this.props.type === 'success'){
        MessageCo =  <Message onDismiss={this.onDismiss}
            success
            header={this.props.title}
            content={this.props.msg}
          />;
      }

    }
    return (<div>{MessageCo}<CoApp {...this.props} /></div>);
  }

}

const mapStateToProps = ({app}) => {
  return app;
}
AppRoot = connect(mapStateToProps)(AppRoot);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router>
          <Route path="/" component={AppRoot}/>
      </Router>
      <DevTools />
   </div>
  </Provider>,
  document.getElementById('root')
);
