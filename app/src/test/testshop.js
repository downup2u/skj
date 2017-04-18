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

  getnextusers_request,
  getdistsalesorderstat_request,
  getdistsalesorders_request
} from '../actions';

import {
  mycartgetall,
  mycollectiongetall,
  myordergetall,
  mycartaddone,
  mycartupdateone,
  mycartdelone,
  mycollectiondelone,
  mycollectionisproductexits,
  myorderaddone,
  myorderupdateone,
  productcommentsfromproduct,
  productcommentaddone,
  productcommentsfromproductgetcount,
  withdrawcashapplyaddone,
  withdrawcashapplyauth,
  mycoupongetall,
  getdistsalesorderdetails
} from '../actions/sagacallback.js';

//测试新增购物车
let test_mycartaddone_request=(dispatch)=>{
  let payload = {
    product:'58eaecea130f4809a747d2f8',
    number:1
  };
  dispatch(mycartaddone(payload)).then((result)=>{
    //mycartaddone result=>{"updateditem":{"_id":"58ed7e34d3f83a025b8067b5","product":"58eaecea130f4809a747d2f8","creator":"58d6ae16e9eeb16b217bba0c","created_at":"2017-04-12T01:09:08.078Z","__v":0,"number":19}}
    //mycartaddone result=>{"newitem":{"__v":0,"product":"58eaecea130f4809a747d2f8","number":1,"creator":"58d6ae16e9eeb16b217bba0c","created_at":"2017-04-12T07:20:37.989Z","_id":"58edd545bad97c1b2c33f362"}}   
    let item = result.updateditem || result.newitem;
    console.log("mycartaddone result=>" + JSON.stringify(item));
  });

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

//判断我的收藏里面是否有产品
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
    _id:'58ef69ed510c6f3752e889c0',
    data:{
      payway:'alipay',
      paystatus:'已支付',
    }
  };
 // dispatch(myorderupdateone_request(payload));
  dispatch(myorderupdateone(payload)).then((result)=>{
    //{"updateditem":{"_id":"58ed8391d3f83a025b8067b9","payway":"alipay"
    console.log("myorderupdateone result=>" + JSON.stringify(result));
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
// 提现相关
//================================================================
//提现申请，表单数据合并发送
let test_withdrawcashapplyaddone_request=(dispatch)=>{
  let payload = {
    truename:'wangxiaoqing',//真实姓名
    bankaccount:'62258842089912234',//银行账号
    bankname:'招商银行',//银行名称
    cashmoney:50.00,//提现金额
  };
  dispatch(withdrawcashapplyaddone(payload)).then((result)=>{
    //withdrawcashapplyaddone result=>{"newitem":{"__v":0,"truename":"wangxiaoqing","bankaccount":"62258842089912234","bankname":"招商银行","cashmoney":50,"creator":"58d6ae16e9eeb16b217bba0c","created_at":"2017-04-12T05:59:06.827Z","status":"未验证","authcode":"5513","_id":"58edc22a77c9631304958fcf"}}
    console.log("withdrawcashapplyaddone result=>" + JSON.stringify(result));
  });

}
//提现手机验证，输入手机验证码后发送
let test_withdrawcashapplyauth_request=(dispatch)=>{
  let payload = {
    _id:'58edc22a77c9631304958fcf',
    username:'15961125167',
    authcode:'5513'
  };
  dispatch(withdrawcashapplyauth(payload)).then((result)=>{
    //withdrawcashapplyauth result=>{"result":"OK","updateditem":{....}
    //withdrawcashapplyauth result=>{"result":"Error",errmsg:'验证码不对'};
    console.log("withdrawcashapplyauth result=>" + JSON.stringify(result));
  });
}

//测试获取我的优惠券
let test_mycoupongetall_request=(dispatch)=>{
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
  dispatch(mycoupongetall(payload)).then(({result})=>{
    //mycoupongetall result=>{"docs":[],"total":0,"limit":10,"page":1,"pages":1}
    console.log("mycoupongetall result=>" + JSON.stringify(result));
  });
}
//=============分销相关================
//测试获取下级用户个数（我的分销页面）
let test_getnextusers_request=(dispatch)=>{
  dispatch(getnextusers_request({}));
  //返回数据：{level1:1,level2:0}
}

let test_getdistsalesorderstat_request=(dispatch)=>{
  //下线订单统计页面
  dispatch(getdistsalesorderstat_request({}));
  //[{_id:2,totalorders:1,totalnumbers:1.5}],表示二2级分销,订单个数1,总奖金1.5
}

let test_getdistsalesorders_request=(dispatch)=>{
  //下线订单统计页面
  dispatch(getdistsalesorders_request({}));
  //{"level1users":{"58ef3c3a80703c2e7a144339":{"username":"15961123513","nickname":"游客0130","avatar":"img/myprofile/1.png","totalorderprices":0,"totalfeebonus":0}},"level2users":{"58ef3c8380703c2e7a14433a":{"username":"13861174733","nickname":"游客8859","avatar":"img/myprofile/1.png","totalorderprices":0,"totalfeebonus":0}}}
}

let test_getdistsalesorderdetails_request=(dispatch)=>{
  //分销页面详情（分页）
    let page = 1;
  let perpagenumber = 10;
  let payload = {
    query:{srctype : "order"},//
    options:{
      page: page,
      limit: perpagenumber,
    }
  };
  //dispatch(mycollectiongetall_request(payload));
  dispatch(getdistsalesorderdetails(payload)).then(({result})=>{
    //mycoupongetall result=>{"docs":[],"total":0,"limit":10,"page":1,"pages":1}
    console.log("getdistsalesorderdetails result=>" + JSON.stringify(result));
  });

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
    test_myorderdelone_request,

    test_productcommentsfromproduct_request,
    test_productcommentaddone_request,
    test_productcommentsfromproductgetcount_request,

    test_withdrawcashapplyaddone_request,
    test_withdrawcashapplyauth_request,

    test_mycoupongetall_request,

    test_getnextusers_request,
    test_getdistsalesorderstat_request,
    test_getdistsalesorders_request,
    test_getdistsalesorderdetails_request,
};