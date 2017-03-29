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
   console.log("normalizrtopiclist:" + JSON.stringify(oldtopicdataobj));
   const newtopicdataobj = normalize(oldtopicdataobj, mySchema);
  console.log("normalizrtopiclistnewtopicdataobj:" + JSON.stringify(newtopicdataobj));
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



export {normalizrtopiclist,normalizr_notifymessageslist,normalizruseralerttopic,normalizruseralerttopiclist};
