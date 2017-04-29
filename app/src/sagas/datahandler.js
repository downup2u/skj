import {
    showpopmessage,
    login_request,login_result,login_err,
    logout_request,logout_result,
    loginwithtoken_request,
    inserttopic_request,inserttopic_result,
    getmytopic_request,getmytopic_result,
    gettopiclist_request,gettopiclist_result,
    insertcommentstotopic_request,insertcommentstotopic_result,
    insertcommentstocomments_request,insertcommentstocomments_result,
    lovetopicadd_request,lovetopicadd_result,
    lovetopicunadd_request,lovetopicunadd_result,
    lovecommentsadd_request,lovecommentsadd_result,
    lovecommentsunadd_request,lovecommentsunadd_result,

    createdevice_request, createdevice_result,
    getdevicelist_request,getdevicelist_result,
    deletedevice_request,deletedevice_result,
    setuseralerttopicreaded_request,
    createaddress_request,
    deleteaddress_request,
    editaddress_request,
    getaddresslist_request,

    getnotifymessage_request,
    fillprofile_request,
    findpwd_request,

    getbanner_request,
    getcategory_request,
    getproduct_request,

    mycartaddone_request,
    mycartupdateone_request,
    mycartdelone_request,
    mycartgetall_request,
    mycollectionaddone_request,
    mycollectiondelone_request,
    mycollectiongetall_request,
    myorderaddone_request,
    myorderupdateone_request,
    myorderdelone_request,
    myordergetall_request,
    mycollectionisproductexits_request,

    productcommentsfromproduct_request,
    productcommentaddone_request,
    productcommentsfromproductgetcount_request,

    withdrawcashapplyaddone_request,
    withdrawcashapplyauth_request,

    mycoupongetall_request,

    getnextusers_request,
    getdistsalesorderstat_request,
    getdistsalesorders_request,    

    getdistsalesorderdetails_request,
    getpaysign_request,

    getusermoney,
    useraddpoint_request,
    getusergetpointsigntoday_request,
    getuserpointdetails_request,
    loginwithoauth_request,
    oauthbinduser_request,

    setlastreadmsgtime_request,

    feedbackaddone_request,
    getabouthtml_request,

    expressquery_request,

    sendauth_request,sendauth_result,sendauth_err,
    register_request,register_result,register_err,
} from '../actions/index.js';



//非验证发送接口
exports.sendmessagefnsz = {
        'getabouthtml':`${getabouthtml_request}`,
        'oauthbinduser':`${oauthbinduser_request}`,
        'loginwithoauth':`${loginwithoauth_request}`,
        'login':`${login_request}`,
        'sendauth':`${sendauth_request}`,
        'register':`${register_request}`,
        'gettopiclist':`${gettopiclist_request}`,
        'getnotifymessage':`${getnotifymessage_request}`,
        'findpwd':`${findpwd_request}`,
        'getbanner':`${getbanner_request}`,
        'getcategory':`${getcategory_request}`,
        'getproduct':`${getproduct_request}`,
        'setlastreadmsgtime':`${setlastreadmsgtime_request}`,
};

//验证发送接口
exports.sendmessageauthfnsz = {
     'getmytopic':`${getmytopic_request}`,
            'inserttopic':`${inserttopic_request}`,
            'insertcommentstotopic':`${insertcommentstotopic_request}`,
            'insertcommentstocomments':`${insertcommentstocomments_request}`,
            'lovetopicadd':`${lovetopicadd_request}`,
            'lovetopicunadd':`${lovetopicunadd_request}`,
            'lovecommentsadd':`${lovecommentsadd_request}`,
            'lovecommentsunadd':`${lovecommentsunadd_request}`,
            'createdevice':`${createdevice_request}`,
            'getdevicelist':`${getdevicelist_request}`,
            'deletedevice':`${deletedevice_request}`,

            'createaddress':`${createaddress_request}`,
            'deleteaddress':`${deleteaddress_request}`,
            'editaddress':`${editaddress_request}`,
            'getaddresslist':`${getaddresslist_request}`,
            'fillprofile':`${fillprofile_request}`,
            'logout':`${logout_request}`,
            'setuseralerttopicreaded':`${setuseralerttopicreaded_request}`,

            'mycartaddone':`${mycartaddone_request}`,
            'mycartdelone':`${mycartdelone_request}`,
            'mycartupdateone':`${mycartupdateone_request}`,
            'mycartgetall':`${mycartgetall_request}`,
            'mycollectionaddone':`${mycollectionaddone_request}`,
            'mycollectiondelone':`${mycollectiondelone_request}`,
            'mycollectiongetall':`${mycollectiongetall_request}`,
            'mycollectionisproductexits':`${mycollectionisproductexits_request}`,
            
            'myorderaddone':`${myorderaddone_request}`,
            'myorderupdateone':`${myorderupdateone_request}`,
            'myorderdelone':`${myorderdelone_request}`,    
            'myordergetall':`${myordergetall_request}`, 
            'getpaysign':`${getpaysign_request}`,

            'productcommentsfromproduct':`${productcommentsfromproduct_request}`,
            'productcommentaddone':`${productcommentaddone_request}`,    
            'productcommentsfromproductgetcount':`${productcommentsfromproductgetcount_request}`, 
       
            'withdrawcashapplyaddone':`${withdrawcashapplyaddone_request}`,    
            'withdrawcashapplyauth':`${withdrawcashapplyauth_request}`,

            'mycoupongetall' :`${mycoupongetall_request}`,

            'getnextusers' :`${getnextusers_request}`,
            'getdistsalesorderstat' :`${getdistsalesorderstat_request}`,
            'getdistsalesorders' :`${getdistsalesorders_request}`,
            'getdistsalesorderdetails':`${getdistsalesorderdetails_request}`,

            'getusermoney':`${getusermoney}`,
            'useraddpoint':`${useraddpoint_request}`,
            'getusergetpointsigntoday':`${getusergetpointsigntoday_request}`,
            'getuserpointdetails':`${getuserpointdetails_request}`,
            'feedbackaddone':`${feedbackaddone_request}`,

            'expressquery':`${expressquery_request}`,
};

