if (process.env.NODE_ENV === 'production') {
    module.exports = require('./device.prod');
} else {
    module.exports = require('./device.dev');
}
