const order = require('./order.js');
const cart = require('./cart.js');
const collection = require('./collection.js');
const productcomment = require('./productcomment.js');
const withdrawcash = require('./withdrawcash');
const mycoupon = require('./mycoupon');
const distsales = require('./distsales');
const point = require('./point');
const express = require('./express');

module.exports = {
  getbanner: require('./banner.js').getbanner,
  getcategory: require('./category.js').getcategory,
  getproduct: require('./product.js').getproduct,
  pushmycartcount:cart.pushmycartcount,
  mycartaddone:cart.mycartaddone,
  mycartupdateone:cart.mycartupdateone,
  mycartdelone:cart.mycartdelone,
  mycartgetall:cart.mycartgetall,
  mycollectionaddone:collection.mycollectionaddone,
  mycollectiondelone:collection.mycollectiondelone,
  mycollectiongetall:collection.mycollectiongetall,
  mycollectionisproductexits:collection.mycollectionisproductexits,
  myordergetall:order.myordergetall,
  myorderaddone:order.myorderaddone,
  myorderupdateone:order.myorderupdateone,
  myorderdelone:order.myorderdelone,
  queryorderstatusstat:order.queryorderstatusstat,
  productcommentaddone:productcomment.productcommentaddone,
  productcommentsfromproduct:productcomment.productcommentsfromproduct,
  productcommentsfromproductgetcount:productcomment.productcommentsfromproductgetcount,
  withdrawcashapplyaddone:withdrawcash.withdrawcashapplyaddone,
  withdrawcashapplyauth:withdrawcash.withdrawcashapplyauth,
  mycoupongetall:mycoupon.mycoupongetall,
  getnextusers:distsales.getnextusers,
  getdistsalesorderstat:distsales.getdistsalesorderstat,
  getdistsalesorders:distsales.getdistsalesorders,
  getdistsalesorderdetails:distsales.getdistsalesorderdetails,
  getusermoney:point.getusermoney,
  getusergetpointsigntoday:point.getusergetpointsigntoday,
  useraddpoint:point.useraddpoint,
  getuserpointdetails:point.getuserpointdetails,
  expressquery:express.expressquery,
};

