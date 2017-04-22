export default {
  pos:{
    configuration: '偏好',
    language:'语言',
    theme: {
        name: '皮肤',
        light: 'Clair',
        dark: 'Obscur',
    },
  },
  resources: {
    about:{
      name: '关于信息设置 |||| 关于信息设置',
      fields:{
        keyname:'设置类型',
      }
    },
    baseinfo:{
      name: '基本信息 |||| 基本信息',
    },
    usermgr:{
      name: '用户管理 |||| 用户管理',
    },
    banner:{
      name: '广告编辑 |||| 广告编辑',
    },
    product:{
      name: '产品管理 |||| 产品管理',
      fields:{
        categoryid:'类别',
      }
    },
    category:{
      name: '类别管理 |||| 类别管理',
      fields:{
        product:'产品'
      }
    },
    express:{
      name: '快递管理 |||| 快递管理',
    },
    topic:{
      name: '帖子管理 |||| 帖子管理',
    },
    notifymessage:{
      name: '通知消息 |||| 通知消息',
    },
    feedback:{
      name: '用户反馈 |||| 用户反馈',
    },
    coupon:{
      name: '优惠券管理 |||| 优惠券管理',
    },
    mycoupon:{
      name: '用户优惠券管理 |||| 用户优惠券管理',
      fields:{
        coupon:'优惠券名',
        creator:'目标用户',
      }
    },
    user:{
      name: '用户管理 |||| 用户管理',
    },
    news:{
      name: '动态管理 |||| 动态管理',
    },
    withdrawcash:{
      name: '提现管理 |||| 提现管理',
    },
    order:{
      name: '订单管理 |||| 订单管理',
      fields:{
        orderstatus:'订单状态',
        paystatus:'支付状态',
        creator:'关联用户',
        expressid:'选择快递公司(仅设为可见的快递公司才会列出)',
        expresscode:'快递公司编码',
        orderprice:'商品总额',
        realprice:'实付价',
        couponprice:'优惠价抵扣',
        pointprice:'积分抵扣',
        productname:'产品名',
        productnumber:'购买数量',
        productprice:'产品单价',
        producttotalprice:'产品总价'
      }
    },
    systemconfig:{
      name: '系统配置 |||| 系统配置',
      fields:{
        productcategoryid1:'显示在商城首页的套餐(分类）',
        productcategoryid2:'显示在商城首页的商用一体机(分类）',

      }

    },
  }

};
