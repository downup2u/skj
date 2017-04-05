import { createReducer } from 'redux-act';
import {
    inserttopic_result,
    getmytopic_result,
    gettopiclist_result,
    insertcommentstotopic_result,
    insertcommentstocomments_result,
    lovetopicadd_result,
    lovetopicunadd_result,
    lovecommentsadd_result,
    lovecommentsunadd_result,
    uicommentshow,
    uicommenthide,
    ui_settopiclistinited,
    ui_setmytopiclistinited,
    login_result,
    serverpush_useralerttopic,
    serverpush_useralerttopiclist,
    setuseralerttopicreaded_result
} from '../actions/index.js';
import {normalizrtopiclist,normalizruseralerttopiclist,normalizruseralerttopic} from './normalizr.js';

const initial = {
    forum: {
        selfuser:{},
        mytopicremoteRowCount:0,
        mytopicinited:true,
        mytopiclist: [],
        useralerttopiclist:[],
        topicremoteRowCount:0,
        topicinited:true,
        topiclist: [],
        useralerttopics:{},
        topics: {},
        comments: {},
        subcomment:{},
        users: {},
        selectedid: '',
        iscommentshow: false,
        selectedtype: 'topic'
    },

};

    /*
     array:mytopiclist:
     array:alltopiclist
     topcis:{
     'id'：{...},
     'id':{....}
     }
     comments:{
     'id'：{...},
     'id':{....}
     }
     users:{
     'id':{},
     'id':{},
     ...
     }
     */
const forum = createReducer({
    [setuseralerttopicreaded_result]:(state,payload)=> {
        let newuseralerttopiclist = [];
        for(let id of state.useralerttopiclist){
            if(id != payload._id){
                newuseralerttopiclist.push(id);
            }
        }
        let useralerttopics = {...state.useralerttopics};
        delete useralerttopics[payload._id];
        return {
            ...state,
            useralerttopics,
            useralerttopiclist: [...newuseralerttopiclist]
        };
    },
    [serverpush_useralerttopic]:(state,payload)=>{
        let newdoc = normalizruseralerttopic(payload);
        return {
            ...state,
            useralerttopiclist: [newdoc.result,...state.useralerttopiclist],
            useralerttopics:{
                ...state.useralerttopics,...newdoc.entities.useralerttopics,
            },
            topics: {
                ...state.topics,...newdoc.entities.topics,
            },
            comments:{
                ...state.comments,...newdoc.entities.comments
            },
            subcomment:{
                    ...state.subcomment,...newdoc.entities.subcomment
                },
            users: {
                ...state.users,...newdoc.entities.users
            }
        };
    },
    [serverpush_useralerttopiclist]:(state,payload)=>{
        //console.log("serverpush_useralerttopiclist看看出来什么数据结构：" + JSON.stringify(payload));
        let newdocs = normalizruseralerttopiclist(payload);
        //console.log("serverpush_useralerttopiclist看看出来什么数据结构：" + JSON.stringify(useralerttopiclist));
        return {
            ...state,
            useralerttopiclist: [...newdocs.result.list],
            useralerttopics:{
                ...state.useralerttopics,...newdocs.entities.useralerttopics,
            },
            topics: {
                ...state.topics,...newdocs.entities.topics,
            },
            comments:{
                ...state.comments,...newdocs.entities.comments
            },
            subcomment:{
                    ...state.subcomment,...newdocs.entities.subcomment
            },
            users: {
                ...state.users,...newdocs.entities.users
            }
        };
    },
    [login_result]: (state, payload) => {
        let selfuser = {
            _id:payload.userid,
            username:payload.username,
            profile:payload.profile
        };
        return { ...state,selfuser};
    },
    [ui_setmytopiclistinited]: (state, mytopicinited) => {
        return {...state,mytopicinited};
    },
    [getmytopic_result]: (state, {result}) => {
        let list = result.docs;
        let mytopicremoteRowCount = result.total;
        let newdocs = normalizrtopiclist({list});
        if(state.mytopicinited) {//替换
            return {
                ...state,
                mytopicremoteRowCount,
                mytopicinited:false,
                mytopiclist: [...newdocs.result.list],
                topics: {
                    ...state.topics,...newdocs.entities.topics,
                },
                comments:{
                    ...state.comments,...newdocs.entities.comments
                },
                users: {
                    ...state.users,...newdocs.entities.users
                },
                subcomment:{
                    ...state.subcomment,...newdocs.entities.subcomment
                },
                topicremoteRowCount:0,
                topicinited:true,
                topiclist: [],
            };
        }
        return {
            ...state,
            mytopiclist: [...newdocs.result.list,...state.mytopiclist],
            topics: {
               ...state.topics,...newdocs.entities.topics,
            },
            comments:{
                ...state.comments,...newdocs.entities.comments
            },
            users: {
                ...state.users,...newdocs.entities.users
            },
            subcomment:{
                    ...state.subcomment,...newdocs.entities.subcomment
                },
        };
    },
    [ui_settopiclistinited]: (state, topicinited) => {
        return {...state,topicinited};
    },
    [gettopiclist_result]: (state, {result}) => {
        let list = result.docs;
        let topicremoteRowCount = result.total;
        let newdocs = normalizrtopiclist({list});
        if(state.topicinited) {//替换
            return {
                ...state,
                topicremoteRowCount,
                topicinited:false,
                topiclist: [...newdocs.result.list],
                topics: {
                    ...state.topics,...newdocs.entities.topics,
                },
                comments:{
                    ...state.comments,...newdocs.entities.comments
                },
                users: {
                    ...state.users,...newdocs.entities.users
                },
                subcomment:{
                    ...state.subcomment,...newdocs.entities.subcomment
                },
                mytopicremoteRowCount:0,
                mytopicinited:true,
                mytopiclist: [],
            };
        }
        return {
            ...state,
            topiclist: [...newdocs.result.list,...state.topiclist],
            topics: {
                ...state.topics,...newdocs.entities.topics,
            },
            comments:{
                ...state.comments,...newdocs.entities.comments
            },
            users: {
                ...state.users,...newdocs.entities.users
            },
            subcomment:{
                    ...state.subcomment,...newdocs.entities.subcomment
                },
        };
    },
    [inserttopic_result]: (state, payload, prev) => {
        console.log("prev:" + JSON.stringify(prev));
        let newtopic = payload;
        return { ...state,
            topiclist:[newtopic._id,...state.topiclist],
                mytopiclist:[newtopic._id,...state.mytopiclist],
                topics:{
                    ...state.topics,
                    [newtopic._id]:newtopic
                 },
                 users:{
                     ...state.users,
                     [state.selfuser._id]:state.selfuser
                 }
    };
    },
    [lovetopicadd_result]: (state, payload) => {
        let updatedtopic = payload;
        return { ...state,
            topics:{
                ...state.topics,
                [updatedtopic._id]:updatedtopic
            },
            users:{
                ...state.users,
                [state.selfuser._id]:state.selfuser
            }
        };
    },
    [lovetopicunadd_result]: (state, payload) => {
        let updatedtopic = payload;
        return { ...state,
            topics:{
                 ...state.topics,
                [updatedtopic._id]:updatedtopic
            }
        };
    },
    [lovecommentsadd_result]: (state, payload) => {
        let updatedcomment = payload;
        return { ...state,
            comments:{
                ...state.comments,
                [updatedcomment._id]:updatedcomment
            },
            users:{
                ...state.users,
                [state.selfuser._id]:state.selfuser
            }
        };
    },
    [lovecommentsunadd_result]: (state, payload) => {
        let updatedcomment = payload;
        return { ...state,
            comments:{
                ...state.comments,
                [updatedcomment._id]:updatedcomment
            }
        };
    },
    [insertcommentstotopic_result]: (state, payload) => {
        let { newcomments,updatedtopic }  = payload;
        if(newcomments){
            return { ...state,
                comments:{
                    ...state.comments,
                    [newcomments._id]:newcomments
                },
                users:{
                    ...state.users,
                    [state.selfuser._id]:state.selfuser
                }
            };
        }
        if(updatedtopic){
            return { ...state,
                topics:{
                    ...state.topics,
                    [updatedtopic._id]:updatedtopic
                },
                users:{
                    ...state.users,
                    [state.selfuser._id]:state.selfuser
                }
            };
        }
    },
    [insertcommentstocomments_result]: (state, payload) => {
        let { newcomments,updatedcomment } = payload;
        if(newcomments){
            return { ...state,
                comments:{
                    ...state.comments,
                    [newcomments._id]:newcomments
                },
                users:{
                    ...state.users,
                    [state.selfuser._id]:state.selfuser
                }
            };
        }
        if(updatedcomment){
            return { ...state,
                comments:{
                ...state.comments,
                        [updatedcomment._id]:updatedcomment
                },
                users:{
                    ...state.users,
                    [state.selfuser._id]:state.selfuser
                }
            };
        }
    },
    [uicommentshow]: (state, payload) => {
        return {...state,selectedid:payload.selectedid,selectedtype:payload.selectedtype,iscommentshow:true};
    },
    [uicommenthide]: (state, payload) => {
        return {...state,iscommentshow:false};
    },

}, initial.forum);

export default forum;