import {
  mycartgetall_request,
  mycartaddone_request,
  mycartupdateone_request,
  mycartdelone_request,

  mycollectiongetall_request,
  mycollectionaddone_request,
  mycollectiondelone_request,

  myordergetall_request,
  myorderaddone_request,
  myorderupdateone_request,
  myorderdelone_request,
} from '../actions';

import {
  mycartgetall,
  mycollectiongetall,
  myordergetall,
  mycartupdateone,
  mycartdelone,
  mycollectiondelone,
  mycollectionisproductexits,
  myorderaddone,
  myorderupdateone
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



//测试修改购物车
let test_mycartupdateone_request=(dispatch)=>{
  let payload = {
    _id:'58ec7d3e3be8bb1e329c9c94',
    data:{
      "product" :"58eaecea130f4809a747d2f8",
      "number" : 14,
    }
  };
  //dispatch(mycartupdateone_request(payload));
  dispatch(mycartupdateone(payload)).then(({result})=>{
    console.log("mycartupdateone result=>" + JSON.stringify(result));
  });
}


//测试删除购物车
let test_mycartdelone_request=(dispatch)=>{
  let payload = {
    _id:'58ec7d3e3be8bb1e329c9c94',
  };
  //dispatch(mycartdelone_request(payload));
  dispatch(mycartdelone(payload)).then(({result})=>{
    console.log("mycartdelone result=>" + JSON.stringify(result));
  });
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


//测试新增我的收藏
let test_mycollectionaddone_request=(dispatch)=>{
  let payload = {
    product:'58eaecea130f4809a747d2f8',
    number:1
  };
  dispatch(mycollectionaddone_request(payload));

}


//测试删除我的收藏
let test_mycollectiondelone_request=(dispatch)=>{
  let payload = {
    _id:'58ec7d3f3be8bb1e329c9c95',
  };
  //dispatch(mycollectiondelone_request(payload));
  dispatch(mycollectiondelone(payload)).then(({result})=>{
    console.log("mycollectiondelone result=>" + JSON.stringify(result));
  });
}

let test_mycollectionisproductexits=(dispatch)=>{
  let payload = {
    productid:'58ec7d3f3be8bb1e329c9c95',
  };
  //dispatch(mycollectiondelone_request(payload));
  // dispatch(mycollectionisproductexits(payload)).then(({result})=>{
  //   console.log("mycollectionisproductexits result=>" + JSON.stringify(result));
  // });

   payload = {
    productid:'58eaecea130f4809a747d2f8',
  };
  //dispatch(mycollectiondelone_request(payload));
  dispatch(mycollectionisproductexits(payload)).then(({result})=>{
    console.log("mycollectionisproductexits result=>" + JSON.stringify(result));
  });
}



//====================================================
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

//测试新增我的订单
let test_myorderaddone_request=(dispatch)=>{
  let productsdetail = [
    {
      productid:'58e71be6ef4e8d02eca6e0e8',
      number:12,
      price:12
    },
    {
      productid:'58eaecea130f4809a747d2f8',
      number:10,
      price:11
    }
  ];
  let payload = {
    productsdetail,
    payway:'alipay',
    realprice:20,//实付价
    orderprice:30,//订单价=应付价
    orderstatus:'未支付',
    provincename:'江苏省',
    cityname:'常州市',
    distinctname:'武进区',
    address:'天润大厦',
    couponprice:10,//抵扣价
    productprice:80,//产品总价
  };
  //dispatch(myorderaddone_request(payload));
  dispatch(myorderaddone(payload)).then((result)=>{
    //myorderaddone result=>{"newitem":{"__v":0,"payway"
    console.log("myorderaddone result=>" + JSON.stringify(result));
  });
}

//测试修改我的订单
let test_myorderupdateone_request=(dispatch)=>{
  let payload = {
    _id:'58ed8391d3f83a025b8067b9',
    data:{
      payway:'alipay',
      orderstatus:'已支付',
    }
  };
 // dispatch(myorderupdateone_request(payload));
  dispatch(myorderupdateone(payload)).then((result)=>{
    //{"updateditem":{"_id":"58ed8391d3f83a025b8067b9","payway":"alipay"
    console.log("myorderaddone result=>" + JSON.stringify(result));
  });
}


//测试删除我的订单
let test_myorderdelone_request=(dispatch)=>{
  let payload = {
    _id:'58ec860847e29e219f293e90',
  };
  dispatch(myorderdelone_request(payload));

}


export {
    test_mycartgetall_request,
    test_mycartaddone_request,
    test_mycartupdateone_request,
    test_mycartdelone_request,

    test_mycollectiongetall_request,
    test_mycollectionaddone_request,
    test_mycollectiondelone_request,
    test_mycollectionisproductexits,

    test_myordergetall_request,
    test_myorderaddone_request,
    test_myorderupdateone_request,
    test_myorderdelone_request
};