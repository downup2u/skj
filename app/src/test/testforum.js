import {
  login_request,
  getmytopic_request,
  inserttopic_request,
  gettopiclist_request,
  insertcommentstotopic_request,
  lovetopicadd_request,
  lovetopicunadd_request,
  lovecommentsadd_request,
  lovecommentsunadd_request,
} from '../actions';

const testtopicid = '58bbd356e427ce144057a82b';
const testcommentid = '58bbd39be427ce144057a82c';
//测试获取我的发布列表
let test_getmytopic_request =(dispatch)=>{
  let page = 1;
  let perpagenumber = 10;
  let payload = {
    query:{},
    options:{
      page: page,
      limit: perpagenumber,
    }
  };
  dispatch(getmytopic_request(payload));
}

//测试插入一个帖子
let test_inserttopic_request=(dispatch)=>{
  let payload = {
    title:'这是一个帖子'
  };
  dispatch(inserttopic_request(payload));
}

//测试获取所有帖子列表
let test_gettopiclist_request =(dispatch)=>{
  let page = 1;
  let perpagenumber = 10;
  let payload = {
    query:{},
    options:{
      page: page,
      limit: perpagenumber,
    }
  };
  dispatch(gettopiclist_request(payload));
}

let test_insertcommentstotopic_request=(dispatch)=>{
  let payload = {
    topicid:testtopicid,
    comment:{
      title:'这是一个帖子回复'
    }
  };
  dispatch(insertcommentstotopic_request(payload));
};

//主题点赞
let test_lovetopicadd_request=(dispatch)=>{
  let payload = {
    topicid:testtopicid,
  };
  dispatch(lovetopicadd_request(payload));
};
let test_lovetopicunadd_request=(dispatch)=>{
  let payload = {
    topicid:testtopicid,
  };
  dispatch(lovetopicunadd_request(payload));
};
let test_lovecommentsadd_request=(dispatch)=>{
  let payload = {
    commentid:testcommentid,
  };
  dispatch(lovecommentsadd_request(payload));
};
let test_lovecommentsunadd_request=(dispatch)=>{
  let payload = {
    commentid:testcommentid,
  };
  dispatch(lovecommentsunadd_request(payload));
};



export {test_getmytopic_request,
  test_inserttopic_request,
  test_gettopiclist_request,
  test_insertcommentstotopic_request,
  test_lovetopicadd_request,
  test_lovetopicunadd_request,
  test_lovecommentsadd_request,
  test_lovecommentsunadd_request,
};
