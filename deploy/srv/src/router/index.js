let startrouter = (app)=>{
  require('./upload.js')(app);
  require('./useradmin.js')(app);
  require('./useradmincustom.js')(app);
  require('../pay/startnotify.js')(app);
  //require('./userapp.js')(app);
};


exports.startrouter = startrouter;
