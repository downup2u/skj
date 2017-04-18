if (process.env.NODE_ENV === 'production') {
    module.exports = require('./share.prod');
} else {
    module.exports = require('./share.dev');
}