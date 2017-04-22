import { createReducer } from 'redux-act';
import {
    clickTab,
    showpopmessage,
    hidepopmessage,
    uicommentimg,
    uiaddcartdilog,
    getsystemconfig_result,
    setmsgcount
} from '../actions/index.js';


const initial = {
    app: {
        curtabindex: 0,
        type: 'error',
        title: '',
        msg: '',
        ispop: false,

        //是否显示大图控件
        bigimgshow : false,
        bigimglist : [],
        bigimgindex : 0,
        
        //是否显示添加购物车控件
        addcartdilogshow : false,
        addcartdilogproid : '',
        addcartdilogpronumber : 1,

        expressfee : 10,
        expressfeeforfree: 100,
        productid1: '',
        productid2: '',

        newmsgnumber:0
    },

};

const app = createReducer({
    [setmsgcount]: (state, newmsgnumber) => {
        console.log('setmsgcount===>' + newmsgnumber);
        return { ...state, newmsgnumber};
    },
    [getsystemconfig_result]: (state, payload) => {
        return { ...state, ...payload };
    },
    [clickTab]: (state, payload) => {
        return { ...state, curtabindex: payload.curtabindex };
    },
    [showpopmessage]:(state, payload) => {
        return { ...state,msg:payload.msg,title:payload.title,type:payload.type,ispop:true};
    },
    [hidepopmessage]:(state, payload) => {
        return { ...state,msg:'',title:'',ispop:false};
    },
    //添加购物车
    [uiaddcartdilog] : (state, payload) => {
        return { ...state, ...payload };
    },
    [uicommentimg]: (state, payload) => {
        return { ...state, ...payload };
    },
}, initial.app);

export default app;