import { createReducer } from 'redux-act';
import {
    clickTab,
    showpopmessage,
    hidepopmessage,
    uicommentimg,
    uiaddcartdilog,
    getsystemconfig_result,
    setmsgcount,
    set_innerheight,
    setisweixininstalled,
    setsharesettingcur,
    getserverdate_result,
    set_homeconfirmday,
    set_homeconfirmvol,
} from '../actions/index.js';
import moment from 'moment';

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
        addcartdilogtype : "",

        expressfee : 10,
        expressfeeforfree: 100,
        productid1: '',
        productid2: '',

        newmsgnumber:0,
        innerheight : 0,

        isweixininstalled:true,

        maxleftpecent : 90,//净水器报警百分比
        sharesettingcur:{

        },
        srvdate:moment(),

        homeconfirmday : 1,
        homeconfirmvol : 95
    },

};

const app = createReducer({
    [set_homeconfirmday]:(state,payload)=>{
        
        return {...state,homeconfirmday : payload};
    },
    [set_homeconfirmvol]:(state,payload)=>{

        return {...state,homeconfirmvol : payload};
    },
    [getserverdate_result]:(state,payload)=>{
        const srvdate = moment(payload.srvdate);
        return {...state,srvdate};
    },
    [setsharesettingcur]:(state,payload)=>{
      let sharesettingcur = {...payload};
      return {...state,sharesettingcur};
    },
    [setisweixininstalled]: (state, isweixininstalled) => {
        return { ...state, isweixininstalled };
    },
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

    [set_innerheight]:(state) => {
        localStorage.setItem('innerheight',window.innerHeight);
        return { ...state, innerheight : window.innerHeight };
    },
}, initial.app);

export default app;
