let islocalhost = false;
let serverurl = islocalhost?'http://localhost:3100':'http://skj.com28.cn';
export default {
    restserverurl:serverurl +'/adminapi',
    serverurl:serverurl
};
