import { normalize, schema } from 'normalizr';

// Define a users schema
const user = new schema.Entity('users',{},{
  idAttribute: '_id',
});

// Define your comments schema
const comment = new schema.Entity('comments', {
  creator: user,
  comments: [ comment ],
  loves:[user]
},{idAttribute: '_id'});

// Define your article
const topics = new schema.Entity('topics', {
  creator: user,
  comments: [ comment ],
  loves:[user]
},{idAttribute: '_id'});

const mySchema = { docs: [ topics ] }
// const docSchema = new schema.Object({ docs: new schema.Array(topics) });

let normalizrtopiclist=(oldtopicdataobj)=>{
  console.log("normalizrtopiclist before====>" + JSON.stringify(oldtopicdataobj));
  const newtopicdataobj = normalize(oldtopicdataobj, mySchema);
  console.log("normalizrtopiclist after ====>" + JSON.stringify(newtopicdataobj));
  return newtopicdataobj;
};

export {normalizrtopiclist};
