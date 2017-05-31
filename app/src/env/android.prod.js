import store from './store';
import { goBack  } from 'react-router-redux';//https://github.com/reactjs/react-router-redux
import {exitApp as exitApptoAndroid} from './xview/Common';
let handlerbackfn;

export const exitApp=()=>{
  console.log(`exit app`);
  exitApptoAndroid();
}

export const setbackhandler=(fn)=>{
  handlerbackfn = fn;
}

export const removebackhandler=()=>{
  handlerbackfn = undefined;
}

export const registerandroid=()=>{
  window.webBack=()=>{
    if(!!handlerbackfn){
      handlerbackfn();
    }
    else{
      store.dispatch(goBack());
    }
  };
}
