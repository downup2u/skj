let islocalhost = true;
let serverurl = islocalhost?'http://localhost:3101':'http://skj.com28.cn';
export default {
    restserverurl:serverurl +'/adminapi',
    serverurl:serverurl
};
