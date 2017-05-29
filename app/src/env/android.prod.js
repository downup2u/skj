import store from './store';
import { goBack  } from 'react-router-redux';//https://github.com/reactjs/react-router-redux

let handlerbackfn;
export const setbackhandler=(fn)=>{
  handlerbackfn = fn;
}

export const removebackhandler=()=>{
  handlerbackfn = undefined;
}

export const registerandroid=()=>{
  window.clickbackbtn=()=>{
    if(!!handlerbackfn){
      handlerbackfn();
    }
    else{
      store.dispatch(goBack());
    }
  };
}
