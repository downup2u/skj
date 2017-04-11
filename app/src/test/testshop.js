import {
  mycartgetall_request,
  mycollectiongetall_request,
  myordergetall_request,
  mycartaddone_request,
  mycollectionaddone_request,

  mycartupdateone_request,
  mycartdelone_request,
  mycollectionupdateone_request,
  mycollectiondelone_request
} from '../actions';

import {
  mycartgetall,
  mycollectiongetall,
  myordergetall
} from '../actions/sagacallback.js';

//测试新增购物车
let test_mycartaddone_request=(dispatch)=>{
  let payload = {
    product:'58eaecea130f4809a747d2f8',
    number:1
  };
  dispatch(mycartaddone_request(payload));

}

//测试获取购物车
let test_mycartgetall_request=(dispatch)=>{
  let page = 1;
  let perpagenumber = 10;
  let payload = {
    query:{},
    options:{
      page: page,
      limit: perpagenumber,
    }
  };
  //dispatch(mycartgetall_request(payload));
  dispatch(mycartgetall(payload)).then(({result})=>{
    console.log("mycartgetall result=>" + JSON.stringify(result));
  });
}
//测试新增我的收藏
let test_mycollectionaddone_request=(dispatch)=>{
  let payload = {
    product:'58eaecea130f4809a747d2f8',
    number:1
  };
  dispatch(mycollectionaddone_request(payload));

}
//测试获取我的收藏
let test_mycollectiongetall_request=(dispatch)=>{
  let page = 1;
  let perpagenumber = 10;
  let payload = {
    query:{},
    options:{
      page: page,
      limit: perpagenumber,
    }
  };
  //dispatch(mycollectiongetall_request(payload));
  dispatch(mycollectiongetall(payload)).then(({result})=>{
    console.log("mycollectiongetall result=>" + JSON.stringify(result));
  });
}

//测试获取我的订单
let test_myordergetall_request=(dispatch)=>{
  let page = 1;
  let perpagenumber = 10;
  let payload = {
    query:{},
    options:{
      page: page,
      limit: perpagenumber,
    }
  };
  //dispatch(myordergetall_request(payload));
  dispatch(myordergetall(payload)).then(({result})=>{
    console.log("myordergetall result=>" + JSON.stringify(result));
  });
}




//测试修改购物车
let test_mycartupdateone_request=(dispatch)=>{
  let payload = {
    _id:'58ec680f38b16714c4ad1474',
    data:{
      "product" :"58eaecea130f4809a747d2f8",
      "number" : 14,
    }
  };
  dispatch(mycartupdateone_request(payload));

}


//测试删除购物车
let test_mycartdelone_request=(dispatch)=>{
  let payload = {
    _id:'58ec680f38b16714c4ad1474',
  };
  dispatch(mycartdelone_request(payload));

}


//测试修改我的收藏
let test_mycollectionupdateone_request=(dispatch)=>{
  let payload = {
    _id:'58ec7712b2eb6219a84f150f',
    data:{
      "product" :"58eaecea130f4809a747d2f8",
      "number" : 14,
    }
  };
  dispatch(mycollectionupdateone_request(payload));

}


//测试删除我的收藏
let test_mycollectiondelone_request=(dispatch)=>{
  let payload = {
    _id:'58ec7712b2eb6219a84f150f',
  };
  dispatch(mycollectiondelone_request(payload));

}

export {
  test_mycartaddone_request,
  test_mycartgetall_request,
  test_mycollectiongetall_request,
  test_mycollectionaddone_request,
  test_myordergetall_request,
  test_mycartupdateone_request,
  test_mycartdelone_request,
  test_mycollectionupdateone_request,
  test_mycollectiondelone_request
};