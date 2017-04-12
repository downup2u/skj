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
  myorderupdateone,
  productcommentsfromproduct,
  productcommentaddone,
  productcommentsfromproductgetcount
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

//判断产品是否被收藏
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

//================================================================
//产品评论相关
let test_productcommentsfromproduct_request=(dispatch)=>{
  let payload = {
     productid:'58e71be6ef4e8d02eca6e0e8',
  };
  dispatch(productcommentsfromproduct(payload)).then((result)=>{
    //productcommentsfromproduct result=>{"list":[{"_id":"58ed937d5a7eff0a1e579a3a","product":"58e71be6ef4e8d02eca6e0e8","order":"5
    console.log("productcommentsfromproduct result=>" + JSON.stringify(result));
  });

}
//新增产品评论
let test_productcommentaddone_request=(dispatch)=>{
    //   product:{ type: Schema.Types.ObjectId, ref: 'Product' },
    // creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    // order:{ type: Schema.Types.ObjectId, ref: 'Order' },
    // ratenum:Number,
    // commenttxt:String,
    // created_at: Date,
    // isshow:Boolean
  let payload = {
    product:'58e71be6ef4e8d02eca6e0e8',
    order:'58ed8391d3f83a025b8067b9',
    ratenum:5,
    commenttxt:'这个挺好'
  };
  dispatch(productcommentaddone(payload)).then((result)=>{
    //productcommentaddone result=>{"newitem":{"__v":0,"product":"58e71be6ef4e8d02eca6e0e8","order":"58ed8391d3f83a025b8067b9","ratenum":5,"commenttxt":"这个挺好","creator":"58d6ae16e9eeb16b217bba0c","created_at":"2017-04-12T02:40:21.010Z","_id":"58ed93955a7eff0a1e579a3c"}}
    console.log("productcommentaddone result=>" + JSON.stringify(result));
  });

}
//获取产品以一个多少条评论
let test_productcommentsfromproductgetcount_request=(dispatch)=>{
  let payload = {
    productid:'58e71be6ef4e8d02eca6e0e8',
  };
  dispatch(productcommentsfromproductgetcount(payload)).then((result)=>{
    //productcommentsfromproductgetcount result=>{"count":3}
    console.log("productcommentsfromproductgetcount result=>" + JSON.stringify(result));
  });

}
//================================================================

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
    test_myorderdelone_request,

    test_productcommentsfromproduct_request,
    test_productcommentaddone_request,
    test_productcommentsfromproductgetcount_request
};