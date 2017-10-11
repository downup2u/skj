const expressquery =  require('../tools/expressquery');

exports.expressquery = (socket,payloaddata,ctx)=>{
    expressquery.expressquery(payloaddata,(result)=>{
        socket.emit('shop.expressquery_result',result);
    });
};