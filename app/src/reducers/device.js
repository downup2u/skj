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
    serverpush_devicedata,
    logout_result
} from '../actions/index.js';
import {normalizrdevices} from './normalizr';
import _ from 'lodash';

const initial = {
    device: {
        mydevicelist: [],
        curdevice: '',
        devices:{},
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
        let {newdevice} = payload;
        return {
          ...state,
          mydevicelist:[newdevice._id,...state.mydevicelist],
          curdevice:newdevice._id,
          devices:{
            ...state.devices,
            [newdevice._id]:newdevice
          }
        };
    },
    [serverpush_devicedata]:(state,payload) => {
      let device = payload;
      return {
        ...state,
        devices:{
          ...state.devices,
          [device._id]:device
        }
      };
    },
    [getdevicelist_result]: (state, payload) => {
        let {mydevicelist} = payload;
        let newdocs = normalizrdevices({list:mydevicelist.docs});
        console.log(`getdevicelist_result==>${JSON.stringify(newdocs)}`);
        return {
          ...state,
          devices:{
            ...newdocs.entities.devices,
          },
          mydevicelist:[...newdocs.result.list],
        };
    },
    [deletedevice_result]: (state, payload) => {
        const {_id} = payload;
        let mydevicelist =  [...state.mydevicelist];
        _.remove(mydevicelist, (id)=> {
            return id === _id;
        });
        let devices = {...state.devices};
        delete devices[_id];
        return {
          ...state,
          mydevicelist,
          devices
        };
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
