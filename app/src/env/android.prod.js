import store from './store';
import { goBack  } from 'react-router-redux';//https://github.com/reactjs/react-router-redux
import * as xview from './xview/Common';
let handlerbackfn;

export const exitApp=()=>{
  try{
    console.log(`exit app`);
    alert('exit app');
    xview.exitApp();
  }
  catch(e){

  }
}

export const setbackhandler=(fn)=>{
  handlerbackfn = fn;
}

export const removebackhandler=()=>{
  handlerbackfn = undefined;
}

export const registerandroid=()=>{
  window.webBack=()=>{
    try{
      //alert("window.webBack");
      if(!!handlerbackfn){
        handlerbackfn();
      }
      else{
        store.dispatch(goBack());
      }
    }
    catch(e){

    }

  };
}
