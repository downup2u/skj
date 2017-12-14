let islocalhost = true;
let serverurl = islocalhost?'http://localhost:3100':'http://skj.com28.cn';
export default {
    restserverurl:`${serverurl}/adminapi`,
    adminauthserverurl:`${serverurl}/adminauth`,
    serverurl:serverurl
};
