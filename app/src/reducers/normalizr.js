import { normalize, schema } from 'normalizr';

// Define a users schema
const user = new schema.Entity('users',{},{
  idAttribute: '_id',
});

// Define your comments schema
const subcomment = new schema.Entity('subcomment', {
  creator: user,
},{idAttribute: '_id'});

const comment = new schema.Entity('comments', {
  creator: user,
  comments: [ subcomment ],
  loves:[user]
},{idAttribute: '_id'});

// Define your article
const topics = new schema.Entity('topics', {
  creator: user,
  comments: [ comment ],
  loves:[user]
},{idAttribute: '_id'});

const useralerttopics = new schema.Entity('useralerttopics', {
  creator: user,
  topicself: topics,
  commentself:comment,
  comment:comment,
  userfrom:user,
},{idAttribute: '_id'});

const mySchema = { list: [ topics ] }
// const docSchema = new schema.Object({ docs: new schema.Array(topics) });

let normalizrtopiclist=(oldtopicdataobj)=>{
   const newtopicdataobj = normalize(oldtopicdataobj, mySchema);
   return newtopicdataobj;
};


// Define a orders schema
const notifymessages = new schema.Entity('notifymessages',{},{
  idAttribute: '_id',
});

const notifymessagesSchma = {list:[notifymessages]};

const normalizr_notifymessageslist=(list)=>{
  const notifymessages = normalize(list, notifymessagesSchma);
  return notifymessages;
};

const useralerttopicsSchma = {list:[useralerttopics]};
const normalizruseralerttopic = (result)=>{
  const norresult = normalize(result, useralerttopics);
  return norresult;
};
const normalizruseralerttopiclist = (result)=>{
  const norresult = normalize(result, useralerttopicsSchma);
  return norresult;
};

//====================商城====================
const devices = new schema.Entity('devices',{},{
  idAttribute: '_id',
});
const devicesSchma = { list: [ devices ] };

const banners = new schema.Entity('banners',{},{
  idAttribute: '_id',
});
const bannersSchma = { list: [ banners ] };

const categories = new schema.Entity('categories',{},{
  idAttribute: '_id',
});
const categoriesSchma = { list: [ categories ] };

const products = new schema.Entity('products',{},{
  idAttribute: '_id',
});
const productsSchma = { list: [ products ] };

const normalizrdevices=(list)=>{
  const devices = normalize(list, devicesSchma);
  return devices;
};

const normalizrbanners=(list)=>{
  const banners = normalize(list, bannersSchma);
  return banners;
};
const normalizrcategories=(list)=>{
  const categories = normalize(list, categoriesSchma);
  return categories;
};
const normalizrproducts=(list)=>{
  const products = normalize(list, productsSchma);
  return products;
};

const carts = new schema.Entity('carts',{},{
  idAttribute: '_id',
});
const cartsSchma = {list:[carts]};
const normalizr_cartslist=(list)=>{
  const carts = normalize(list, cartsSchma);
  return carts;
};
const collections = new schema.Entity('collections',{},{
  idAttribute: '_id',
});
const collectionsSchma = {list:[collections]};
const normalizr_collectionslist=(list)=>{
  const collections = normalize(list, collectionsSchma);
  return collections;
};
const orders = new schema.Entity('orders',{},{
  idAttribute: '_id',
});
const ordersSchma = {list:[orders]};
const normalizr_orderslist=(list)=>{
  const orders = normalize(list, ordersSchma);
  return orders;
};

export {
  normalizrdevices,
  normalizrbanners,
  normalizrcategories,
  normalizrproducts,
  normalizrtopiclist,
  normalizr_notifymessageslist,
  normalizruseralerttopic,
  normalizruseralerttopiclist,
  normalizr_cartslist,
  normalizr_collectionslist,
  normalizr_orderslist
};
