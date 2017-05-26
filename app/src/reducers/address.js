/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    createaddress_result,
    editaddress_result,
    getaddresslist_result,
    deleteaddress_result,
    deleteaddress_confirmpopshow,
    deleteaddress_confirmpophide,
    logout_result
} from '../actions/index.js';

const initial = {
    address:{
        addresslist:[],
        isconfirmshow:false,
        poptitle:'',
        popmsg:'',
        deleteingaddress:{}
    }
};



const address = createReducer({
    [logout_result]:(state, payload)=>{
        return { ...initial.address};
    },
   [createaddress_result]: (state, payload) => {
        let newaddress = payload;
        return { ...state, addresslist:[newaddress,...state.addresslist] };
    },
    [editaddress_result]: (state, payload) => {
        const {editedaddress} = payload;
        let addresslist =  state.addresslist;
        let newaddresslist = [];
        for(let item of addresslist){
            if(item._id === editedaddress._id){
                newaddresslist.push(editedaddress);
            }
            else{
                newaddresslist.push(item);
            }
        }
        return { ...state,addresslist:[...newaddresslist]};
    },
    [getaddresslist_result]: (state, payload) => {
        let {myaddresslist} =  payload;
        return { ...state,addresslist:myaddresslist.docs};
    },
    [deleteaddress_result]: (state, payload) => {
        const {_id} = payload;
        let addresslist =  state.addresslist;
        let newaddresslist = [];
        for(let item of addresslist){
            if(item._id !== _id){
                newaddresslist.push(item);
            }
        }
        return { ...state,addresslist:[...newaddresslist]};
    },
    [deleteaddress_confirmpopshow]: (state, payload) => {
        return { ...state,isconfirmshow:true,
            poptitle:payload.poptitle,popmsg:payload.popmsg,deleteingaddress:payload.deleteingaddress};
    },
    [deleteaddress_confirmpophide]: (state, payload) => {
        return { ...state,isconfirmshow:false};
    },

}, initial.address);

export default address;
