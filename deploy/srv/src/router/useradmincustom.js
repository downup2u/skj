let DBModels = require('../db/models.js');
let mongoose     = require('mongoose');
let middlewareauth = require('./middlewareauth.js');
let dbs = require('../admin/dbindex.js');

let startadmincustom = (app)=>{
  app.post('/findone/:resourcename',(req,res)=>{
    console.log("findone:" + req.params.resourcename);
    let schmodel = dbs[req.params.resourcename];
    let dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
    dbModel.findOne({},(err,result)=>{
      if(!err && !!result){
        result = result.toJSON();
        res.status(200).json(result);
      }
      else{
        res.status(404).json({});
      }
    });
  });

}

module.exports= startadmincustom;
