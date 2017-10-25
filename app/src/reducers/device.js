/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    createdevice_result,
    getdevicelist_result,
    deletedevice_result,
    ui_setcurrentdeviceid,
    serverpush_devicedata,
    resetdevicecmd_result,
    logout_result
} from '../actions/index.js';
import {normalizrdevices} from './normalizr';
import _ from 'lodash';

const initial = {
    device: {
        mydevicelist: [],//设备ID
        curdeviceid: '',//主页-当前设备id
        devices:{},//数据字典
    },
};


const device = createReducer({
    [resetdevicecmd_result]: (state, payload) => {
        let newdevice = payload;
        return {
          ...state,
          curdevice:newdevice._id,
          devices:{
            ...state.devices,
            [newdevice._id]:newdevice
          }
        };
    },
    [ui_setcurrentdeviceid]:(state, payload)=>{
        let curdeviceid = payload;
        return { ...state,curdeviceid};
    },
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
        let curdeviceid = mydevicelist.docs.length > 0?mydevicelist.docs[0]._id:'';
        return {
          ...state,
          curdeviceid,
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


}, initial.device);

export default device;
