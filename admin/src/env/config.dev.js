let islocalhost = false;
let serverurl = islocalhost?'http://localhost:3100':'http://shuizhihe.com28.cn:3101';
export default {
    restserverurl:serverurl +'/adminapi',
    serverurl:serverurl
};
