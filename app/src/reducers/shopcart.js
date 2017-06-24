/**
 * Created by wangxiaoqing on 2017/4/7.
 */

import { createReducer } from 'redux-act';
import {
    serverpush_mycartcount,
    ui_cartooder_additem,
    ui_cartooder_delitem,
    ui_cartooder_updateitem,
    ui_cart_selectallitems,
    logout_result,
    set_cartslist,
    del_cartslist,
} from '../actions';
import {normalizr_cartslist} from './normalizr';
import _ from 'lodash';

const initial = {
    carts: {
        remoteRowCount:0,
        toordercarts:{},
        cartsform : {},
        cartslist :{},
        listchange : 0
    },
};

const carts = createReducer({
        [logout_result]:(state, payload)=>{
            return { ...initial.carts};
        },
        [ui_cart_selectallitems]:(state, payload) => {
            const {isselectedall,items} = payload;
            let toordercarts = state.toordercarts;
            if(isselectedall){
                _.map(items,(item,index)=>{
                    toordercarts[item._id] = item;
                });
            }
            else{
                toordercarts = {};
            }
            return  {...state,toordercarts:{...toordercarts}};
        },
        [serverpush_mycartcount]:(state, remoteRowCount) => {
            return  {...state,remoteRowCount};
        },
        [ui_cartooder_updateitem]:(state, item) => {
            let toordercarts = state.toordercarts;
            toordercarts[item._id] = item;
            let cartslist = state.cartslist;
            cartslist[item._id] = item;
            return  {...state,toordercarts:{...toordercarts},cartslist:{...cartslist}};
        
        },
        [ui_cartooder_additem]:(state, item) => {
            let toordercarts = state.toordercarts;
            toordercarts[item._id] = item;
            return  {...state,toordercarts:{...toordercarts}};
        },
        [ui_cartooder_delitem]:(state, item) => {
            let toordercarts = state.toordercarts;
            delete toordercarts[item._id];

            return  {...state,toordercarts:{...toordercarts}};
        },

        [set_cartslist]: (state, list) => {
            
            let cartslist = {};
            _.map(list.payload, (o, index)=>{
                cartslist[o._id] = o;
            })
            //console.log(cartslist);

            return  {...state, cartslist};
        },

        [del_cartslist]:(state, item) => {
            
            let cartslist = state.cartslist;
            let listchange = state.listchange++;
            delete cartslist[item._id];
            return  {...state,cartslist, listchange};
        },

}, initial.carts);

export default carts;