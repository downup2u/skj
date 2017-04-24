/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    createdevice_result,
    getdevicelist_result,
    deletedevice_result,
    deletedevice_confirmpopshow,
    deletedevice_confirmpophide,
    logout_result
} from '../actions/index.js';

const initial = {
    device: {
        mydevicelist: [],
        curdevice: {},
        isconfirmshow: false,
        poptitle: '',
        popmsg: '',
        deleteingdevice: {}
    },
};


const device = createReducer({
    [logout_result]:(state, payload)=>{
        return { ...initial.device};
    },
    [createdevice_result]: (state, payload) => {
        let newdevice = payload;
        return { ...state, mydevicelist:[newdevice,...state.mydevicelist],curdevice:newdevice };
    },
    [getdevicelist_result]: (state, payload) => {
        let mydevicelist =  payload.docs;
        return { ...state,mydevicelist:mydevicelist};
    },
    [deletedevice_result]: (state, payload) => {
        let mydevicelist =  state.mydevicelist;
        let newdevicelist = [];
        for(let item of mydevicelist){
            if(item._id !== payload._id){
                newdevicelist.push(item);
            }
        }
        return { ...state,mydevicelist:[...newdevicelist]};
    },
    [deletedevice_confirmpopshow]: (state, payload) => {
        // isconfirmshow:false,
        // poptitle:'',
        // popmsg:''
        return { ...state,isconfirmshow:true,
            poptitle:payload.poptitle,popmsg:payload.popmsg,deleteingdevice:payload.deleteingdevice};
    },
    [deletedevice_confirmpophide]: (state, payload) => {
        return { ...state,isconfirmshow:false};
    },

}, initial.device);

export default device;