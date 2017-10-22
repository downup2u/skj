const userlogin = require('../handler/userlogin.js');

let DBModels = require('../db/models.js');
let mongoose     = require('mongoose');
let config = require('../../config.js');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl);

describe('测试用户信息', () => {
  describe('测试注册', () => {
    it('测试用户注册', (done) => {
      let newUser = {
        username:'15961125167',
        password:'123456',
      };
      userlogin.registeruser(null,newUser,null);

    });
  });

  describe('测试登录', () => {
    it('测试用户登录', (done) => {
      let oneUser = {
        username:'15961125167',
        password:'123456',
      };
      userlogin.loginuser(null,oneUser,null);

    });
  });
});
