let mongoose     = require('mongoose');
mongoose.Promise = global.Promise;
let Schema       = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate');
//系统设置
let SystemConfigSchema = new Schema({
    productid1: String,
    productid2: String,
    expressfee:String,
    expressfeeforfree:Number,
    bonuslevel1:{ type: Schema.Types.Number,default: 0.1 },//一级分销提成百分比
    bonuslevel2:{ type: Schema.Types.Number,default: 0.05 },//二级分销提成百分比
    pointvsmoney:{ type: Schema.Types.Number,default: 1},//换算,例1积分换1分
    getpointfromsign:{ type: Schema.Types.Number,default: 10},//每天签到一次
    getpointfromshare:{ type: Schema.Types.Number,default: 5},//分享得到积分
    pointlimitshare:{ type: Schema.Types.Number,default: 30},//每天最多获得分享的积分
});
SystemConfigSchema.plugin(mongoosePaginate);
let SystemConfig  = mongoose.model('SystemConfig',  SystemConfigSchema);
// http://mongoosejs.com/docs/populate.html
let UserSchema = new Schema({
    username:String,
    passwordhash: String,
    passwordsalt: String,
    openidqq: String,
    openidweixin: String,
    created_at: Date,
    updated_at: Date,
    profile:Schema.Types.Mixed,
    defaultaddress:{ type: Schema.Types.ObjectId, ref: 'Address' },
    userfrom:{ type: Schema.Types.ObjectId, ref: 'User' },
    userfrom2:{ type: Schema.Types.ObjectId, ref: 'User' },
    invitecode:String,
    balance:{ type: Schema.Types.Number,default: 0 },//用户余额
    point:{ type: Schema.Types.Number,default: 0 },//用户积分
    lastpointforsigndate:Date,
    isenabled:Boolean
});
UserSchema.plugin(mongoosePaginate);
let User  = mongoose.model('User',  UserSchema);

//动态管理
let NewsSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    textname:String,
    created_at: Date,
    isenabled:Boolean
});
NewsSchema.plugin(mongoosePaginate);
let News  = mongoose.model('News',  NewsSchema);


let DeviceSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    devicename:String,
    devicebrand:String,
    devicemodel: String,
    created_at: Date,
});
DeviceSchema.plugin(mongoosePaginate);
let Device  = mongoose.model('Device',  DeviceSchema);

let AddressSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    truename:String,
    phonenumber:String,
    seladdr: Schema.Types.Mixed,
    addressname: String,
    created_at: Date,
});
AddressSchema.plugin(mongoosePaginate);
let Address  = mongoose.model('Address',  AddressSchema);
// 回复自己帖子？
// 点赞自己帖子?
// 或者回复自己评论？
// 点赞自己评论?
//publish:自己帖子id,自己帖子评论id
let UserAlertTopicSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'User' }, //提醒谁看
    type:String,//topiclove,topiccomment,commentlove,commentcomment,
    topicself:{ type: Schema.Types.ObjectId, ref: 'Topic' },//针对哪条帖子
    commentself:{ type: Schema.Types.ObjectId, ref: 'Comment' },//针对那条评论
    comment:{ type: Schema.Types.ObjectId, ref: 'Comment' },//新发的评论
    userfrom:{ type: Schema.Types.ObjectId, ref: 'User' },//来自用户
    created_at: Date,//发表时间
    isreaded:{type:Schema.Types.Boolean,default:false}//是否已读
});
UserAlertTopicSchema.plugin(mongoosePaginate);
let UserAlertTopic  = mongoose.model('UserAlertTopic',  UserAlertTopicSchema);

let TopicSchema = new Schema({
  creator:{ type: Schema.Types.ObjectId, ref: 'User' },
  created_at: Date,
  title:String,
  picurl:[String],
  loves:[String],
  comments:[{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }],
  isvisiable:{ type: Boolean, default: true },
});
TopicSchema.plugin(mongoosePaginate);
let Topic  = mongoose.model('Topic',  TopicSchema);

let CommentSchema = new Schema({
  creator:{ type: Schema.Types.ObjectId, ref: 'User' },
  created_at: Date,
  title:String,
  loves:[{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments:[{ type: Schema.Types.ObjectId, ref: 'Comment' , default: []}],
  isvisiable:{ type: Boolean, default: true },
});
CommentSchema.plugin(mongoosePaginate);
let Comment  = mongoose.model('Comment',  CommentSchema);

UserAdminSchema = new Schema({
  username:String,
  password:String,
  created_at: Date,
  updated_at: Date,
});
let UserAdmin  = mongoose.model('UserAdmin',  UserAdminSchema);


let NotifyMessageSchema = new Schema({
    messagetype:String,//all,app
    touserid:String,
    messagetitle:String,
    messagecontent:String,
    created_at:Date,
});
NotifyMessageSchema.plugin(mongoosePaginate);
let NotifyMessageModel =mongoose.model('notifymessage',  NotifyMessageSchema);

//==============商城==============
//广告图:图片／排序／类型（首页图片）／是否显示
let BannerSchema = new Schema({
    name:String,
    picurl:String,
    sortflag:Number,
    type:String,
    isenabled:{ type: Boolean, default:true},
});
BannerSchema.plugin(mongoosePaginate);
let Banner  = mongoose.model('Banner',  BannerSchema);
//商品：商品名／图片／市场价／现价／摘要/图文详情／是否上架／所在类别／重量／库存／销量
let ProductSchema = new Schema({
    name:String,
    picurl:String,
    picurls:[],
    picurldetails:[],
    pricenow:Number,
    pricemarket:Number,
    brief:String,
    desc:String,
    categoryid:{ type: Schema.Types.ObjectId, ref: 'Category' },
    weight:Number,
    stock:{ type: Number, default:0},
    salesvolume:{ type: Number, default:0},
    publishdate: { type: Date, default:new Date()},
    created_at: { type: Date, default:new Date()},
    isenabled:{ type: Boolean, default:true},
});
ProductSchema.plugin(mongoosePaginate);
let Product  = mongoose.model('Product',  ProductSchema);
//类别：类别名／图片／显示标志／排序字段
let CategorySchema = new Schema({
    name:String,
    picurl:String,
    showflag:Number,
    sortflag:Number,
    created_at: Date,
    isenabled:{ type: Boolean, default:true},
});
CategorySchema.plugin(mongoosePaginate);
let Category  = mongoose.model('Category',  CategorySchema);
//购物车：用户id,商品id,数量
let MycartSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    product:{ type: Schema.Types.ObjectId, ref: 'Product' },
    number:Number,
    created_at: Date,
    isenabled:Boolean
});
MycartSchema.plugin(mongoosePaginate);
let Mycart  = mongoose.model('Mycart',  MycartSchema);
//订单：用户id,[订单详情id],支付方式,折扣金额,金额,订单状态,送货地址id,是否删除，优惠券抵扣金额，优惠券ID／商品总价
let OrderSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    payway:String,//支付方式
    ordertitle:String,  //订单标题（支付宝，微信用）
    body:String,//订单内容（文字）
    realprice:Number,//实付价
    orderprice:Number,//订单价=应付价
    orderstatus:String,
    paystatus:{ type: String, default:'未支付'},
    orderaddress:{
        addressid:String,
        truename:String,
        phonenumber:String,
        seladdr: Schema.Types.Mixed,
        addressname: String,
    },
    isdeleted:{ type:Boolean, default: false },
    productsdetail:[
        {
            productid:String,
            productinfo:Schema.Types.Mixed,
            number:Number,
            price:Number
        }
    ],
    couponprice:Number,//抵扣价
    couponid:{ type: Schema.Types.ObjectId, ref: 'Coupon' },
    pointprice:Number,//积分抵扣价
    point:Number,//所花积分
    productprice:Number,//产品总价
    expressid:{ type: Schema.Types.ObjectId, ref: 'Express' },
    expressbarid:String,
    expressprice:Number,//运费
    created_at: Date,
    pay_at:Date,
});
OrderSchema.plugin(mongoosePaginate);
let Order  = mongoose.model('Order',  OrderSchema);
//快递公司／快递单号／
let ExpressSchema = new Schema({
    expressname:String,
});
ExpressSchema.plugin(mongoosePaginate);
let Express  = mongoose.model('Express',  ExpressSchema);
//订单详情：订单id/单价/数量／商品id/是否评价／合计
//我的收藏：用户id,商品id,
let MycollectionSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    product:{ type: Schema.Types.ObjectId, ref: 'Product' },
    created_at: Date,
});
MycollectionSchema.plugin(mongoosePaginate);
let Mycollection  = mongoose.model('Mycollection',  MycollectionSchema);
//我的优惠券：优惠券id,会员id,状态（0未使用 1已使用2已失效）
let MyCouponSchema = new Schema({
    coupon:{ type: Schema.Types.ObjectId, ref: 'Coupon' },
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    name:String,    //优惠券名
    pricecondition:Number,//价格条件
    pricediscount:Number,//抵扣金额
    expdate: Date,// 过期时间
    usestatus:{ type: Schema.Types.String,default: '未使用'},// //未使用／已使用／已失效
    created_at: Date,
    used_at:Date,
});
MyCouponSchema.plugin(mongoosePaginate);
let MyCoupon  = mongoose.model('MyCoupon',  MyCouponSchema);
//优惠券：优惠券名字,满x元，折扣x元,剩余数量
let CouponSchema = new Schema({
    name:String,    //优惠券名
    pricecondition:Number,//价格条件
    pricediscount:Number,//抵扣金额
    totalstock:Number,//总库存
    leftstock:Number,//剩余库存
    created_at: Date,//生成时间
    expdate: Date,// 过期时间
});
CouponSchema.plugin(mongoosePaginate);
let Coupon  = mongoose.model('Coupon',  CouponSchema);
//我的钱包之明细记录
//评价：商品ID／用户id/评价内容／评价星级／关联订单
let ProductcommentSchema = new Schema({
    product:{ type: Schema.Types.ObjectId, ref: 'Product' },
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    order:{ type: Schema.Types.ObjectId, ref: 'Order' },
    ratenum:Number,
    commenttxt:String,
    created_at: Date,
    isshow:Boolean
});
ProductcommentSchema.plugin(mongoosePaginate);
let Productcomment  = mongoose.model('Productcomment',  ProductcommentSchema);

//意见反馈
let FeedbackSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    feedbacktxt:String,
    created_at: Date,
});
FeedbackSchema.plugin(mongoosePaginate);
let Feedback  = mongoose.model('Feedback',  FeedbackSchema);

//充值记录
let RechargerecordSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    fromorder:{ type: Schema.Types.ObjectId, ref: 'Order' },
    fromwithdrawcashapply:{ type: Schema.Types.ObjectId, ref: 'Withdrawcashapply' },
    fromuser:{ type: Schema.Types.ObjectId, ref: 'User' },
    levelflag:Number,//0:无,1:1级分销,2：2级分销
    feeold:Number,//旧余额
    feenew:Number, //新余额
    feebonus:Number,//奖励金额
    orderprice:Number,//订单金额
    srctype:String,//‘order'来自订单,'withdrawcash'来自提现
    created_at: Date,
});
RechargerecordSchema.plugin(mongoosePaginate);
let Rechargerecord  = mongoose.model('Rechargerecord',  RechargerecordSchema);

//提现申请
let WithdrawcashapplySchema =  new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    truename:String,//真实姓名
    bankaccount:String,//银行账号
    bankname:String,//银行名称
    cashmoney:Number,//提现金额
    status:String,//未验证／已验证／已支付
    created_at: Date,
});
WithdrawcashapplySchema.plugin(mongoosePaginate);
let Withdrawcashapply  = mongoose.model('Withdrawcashapply',  WithdrawcashapplySchema);

//积分表
let PointrecordSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    pointold:Number,//旧积分
    pointnew:Number, //新积分
    pointbonus:Number,//积分抵扣
    fromorder:{ type: Schema.Types.ObjectId, ref: 'Order' },
    srctype:String,//‘order'来自订单
    reason:String,//原因,例如：'签到’
    created_at: Date,
    getdate:String,//获得日期,YYYY-MM-DD
});
PointrecordSchema.plugin(mongoosePaginate);
let Pointrecord  = mongoose.model('Pointrecord',  PointrecordSchema);
//用户余额表
// let UserbalanceSchema= new Schema({
//     creator:{ type: Schema.Types.ObjectId, ref: 'User' },
//     balance:Number,//余额
// });
// UserbalanceSchema.plugin(mongoosePaginate);
// let Userbalance  = mongoose.model('Userbalance',  UserbalanceSchema);
exports.SystemConfigSchema = SystemConfigSchema;
exports.NewsSchema = NewsSchema;
exports.UserSchema= UserSchema;
exports.DeviceSchema= DeviceSchema;
exports.UserAlertTopicSchema= UserAlertTopicSchema;
exports.TopicSchema= TopicSchema;
exports.CommentSchema= CommentSchema;
exports.UserAdminSchema= UserAdminSchema;
exports.AddressSchema = AddressSchema;
exports.NotifyMessageSchema = NotifyMessageSchema;
exports.BannerSchema = BannerSchema;
exports.ProductSchema = ProductSchema;
exports.CategorySchema = CategorySchema;
exports.MycartSchema = MycartSchema;
exports.OrderSchema = OrderSchema;
exports.ExpressSchema = ExpressSchema;
exports.MycollectionSchema = MycollectionSchema;
exports.MyCouponSchema = MyCouponSchema;
exports.CouponSchema = CouponSchema;
exports.ProductcommentSchema = ProductcommentSchema;
exports.FeedbackSchema = FeedbackSchema;
exports.WithdrawcashapplySchema = WithdrawcashapplySchema;
exports.PointrecordSchema = PointrecordSchema;

exports.SystemConfigModel = SystemConfig;
exports.NewsModel = News;
exports.UserModel= User;
exports.DeviceModel= Device;
exports.UserAlertTopicModel= UserAlertTopic;
exports.TopicModel= Topic;
exports.CommentModel= Comment;
exports.UserAdminModel= UserAdmin;
exports.AddressModel= Address;
exports.NotifyMessageModel= NotifyMessageModel;
exports.BannerModel = Banner;
exports.ProductModel = Product;
exports.CategoryModel = Category;
exports.MycartModel = Mycart;
exports.OrderModel = Order;
exports.ExpressModel = Express;
exports.MycollectionModel = Mycollection;
exports.MyCouponModel = MyCoupon;
exports.CouponModel = Coupon;
exports.ProductcommentModel = Productcomment;
exports.FeedbackModel = Feedback;
exports.RechargerecordModel = Rechargerecord;
exports.WithdrawcashapplyModel = Withdrawcashapply;
exports.PointrecordModel = Pointrecord;