/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    newtopicfileuploadsetpreview
} from '../actions/index.js';

const initial = {
    newtopicfileupload: {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    },
};


const newtopicfileupload = createReducer({
    [newtopicfileuploadsetpreview]: (state, payload) => {
        let newstate = state;
        if(payload.hasOwnProperty('previewVisible')){
            newstate =  { ...newstate, previewVisible:payload.previewVisible};
        }
        if(payload.hasOwnProperty('previewImage')){
            newstate =  { ...newstate, previewImage:payload.previewImage};
        }
        if(payload.hasOwnProperty('fileList')){
            newstate =  { ...newstate,fileList:[...payload.fileList]};
        }
        return newstate;
    },
},initial.newtopicfileupload);

export default newtopicfileupload;