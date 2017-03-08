import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/index.js';
import Register from './components/register.js';
import Login from './components/login.js';
import Addresslist from './components/address-list.js';
import AddressAdd from './components/address-add.js';
import Userinfo from './components/user-info.js';
import ProfileDetail from './components/profiledetail.js';
import { TransitionMotion, spring } from 'react-motion';

//import '../../public/semantic.min.css';

import {DevTools,store} from './store';

import {
  BrowserRouter as Router,
  Route,
  Link
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

const CoApp = (props) => {
  console.log("CoApp====>" + JSON.stringify(props));
  let pathname = props.location.pathname;
  let CoAppRoute = App;
  if(pathname === '/register'){
    CoAppRoute = Register;
  }
  else if(pathname === '/addresslist'){
    CoAppRoute = Addresslist;
  }
  else if(pathname === '/addressadd'){
    CoAppRoute = AddressAdd;
  }
  else if(pathname === '/userinfo'){
    CoAppRoute = Userinfo;
  }
  else if(pathname === '/profiledetail'){
    CoAppRoute = ProfileDetail;
  }
  else if(pathname === '/login'){
    CoAppRoute = Login;
  }
  return (<Route exact path={pathname} component={CoAppRoute}/>);
}

import {hideerrmessage} from './actions/index.js';
import { Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

export class AppRoot extends React.Component {
  onDismiss=()=>{
    this.props.dispatch(hideerrmessage());
  }
  componentWillMount () {
  }
  render() {
    console.log("this.props.ispop==>" + JSON.stringify(this.props));
    let MessageCo = null;
    if(this.props.ispop){
      MessageCo = (<Message negative onDismiss={this.onDismiss}>
        <Message.Header>{this.props.errmsg}</Message.Header>
      </Message>);
    }
    return (<div style={styles.content}>{MessageCo}<CoApp {...this.props} /></div>);
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
          <FadeRoute path="/" component={AppRoot}/>
      </Router>
      <DevTools />
   </div>
  </Provider>,
  document.getElementById('root')
);
