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
} from '../actions/index.js';
import {normalizrtopiclist} from './normalizr.js';

const initial = {
    forum: {
        mytopiclist: [],
        topiclist: [],
        topics: {},
        comments: {},
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
    [getmytopic_result]: (state, payload) => {
    let newdocs = normalizrtopiclist(payload);
    return { ...state,
        mytopiclist:[ ...newdocs.result.docs ],//这样分页就有问题
    topics: newdocs.entities.topics,
        comments: newdocs.entities.comments,
        users: newdocs.entities.users,
    };
    },
    [gettopiclist_result]: (state, payload) => {
        let newdocs = normalizrtopiclist(payload);
        return {...state,
            topiclist: [ ...newdocs.result.docs ],//这样分页就有问题
        topics: newdocs.entities.topics,
            comments: newdocs.entities.comments?newdocs.entities.comments:{},
            users: newdocs.entities.users,
    };
    },
    [inserttopic_result]: (state, payload) => {
        let newtopic = payload;
        return { ...state,
            topiclist:[newtopic._id,...state.topiclist],
        mytopiclist:[newtopic._id,...state.mytopiclist],
        topics:{
        ...state.topics,
                [newtopic._id]:newtopic
        }
    };
    },
    [lovetopicadd_result]: (state, payload) => {
        let updatedtopic = payload;
        return { ...state,
            topics:{
        ...state.topics,
                [updatedtopic._id]:updatedtopic
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
            }
        };
        }
        if(updatedtopic){
            return { ...state,
                topics:{
            ...state.topics,
                    [updatedtopic._id]:updatedtopic
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
            }
        };
        }
        if(updatedcomment){
            return { ...state,
                comments:{
            ...state.comments,
                    [updatedcomment._id]:updatedcomment
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