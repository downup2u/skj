/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';


const initial = {
	//商城
    shop: {
    	//顶部滚动广告
        banner1: [
        	{url : "img/shopping/banner.png"},
        	{url : "img/shopping/banner.png"},
        	{url : "img/shopping/banner.png"}
        ],
        //产品列表类型分类：每个类型的产品取前两个产品
        prolist: {
            "1" : [
            	{
                    proid : "1",
                    name : "水可净智能水盒子1",
                    avatar : "img/shopping/9.png",
                    imglist : ['img/shopping/12.png','img/shopping/12.png','img/shopping/12.png'],
                    price : "301.00",
                    info : "<div><img src='img/shopping/banner3.png'></div>"
                },
                {
                    proid : "2",
                    name : "水可净智能水盒子2",
                    avatar : "img/shopping/9.png",
                    imglist : ['img/shopping/12.png','img/shopping/12.png','img/shopping/12.png'],
                    price : "302.00",
                    info : "<div><img src='img/shopping/banner3.png'></div>"
                }
            ],
            "2" : [
                {
                    proid : "3",
                    name : "水可净智能水盒子3",
                    avatar : "img/shopping/9.png",
                    imglist : ['img/shopping/12.png','img/shopping/12.png','img/shopping/12.png'],
                    price : "303.00",
                    info : "<div><img src='img/shopping/banner3.png'></div>"
                },
                {
                    proid : "4",
                    name : "水可净智能水盒子4",
                    avatar : "img/shopping/9.png",
                    imglist : ['img/shopping/12.png','img/shopping/12.png','img/shopping/12.png'],
                    price : "304.00",
                    info : "<div><img src='img/shopping/banner3.png'></div>"
                }
            ]
        },
        //所有的产品列表
        prolistall : {
            "1" : {
                proid : "1",
                name : "水可净智能水盒子1",
                avatar : "img/shopping/9.png",
                imglist : ['img/shopping/12.png','img/shopping/12.png','img/shopping/12.png'],
                price : "301.00",
                info : "<div><img src='img/shopping/banner3.png'></div>",
                type : "1"
            },
            "2" : {
                proid : "2",
                name : "水可净智能水盒子2",
                avatar : "img/shopping/9.png",
                imglist : ['img/shopping/12.png','img/shopping/12.png','img/shopping/12.png'],
                price : "302.00",
                info : "<div><img src='img/shopping/banner3.png'></div>",
                type : "1"
            }
        },
        //产品类型列表
        protype : {
            "1" : {
                name : "净水系统"
            },
            "2" : {
                name : "卫浴系统"
            },
            "3" : {
                name : "管道系统"
            },
            "4" : {
                name : "品质生活"
            }
        }
    }
};

const shop = createReducer({

}, initial.shop);

export default shop;