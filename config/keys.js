///////////////////////////////////////////////
// keys.js - set of credentials for our App //
/////////////////////////////////////////////

if (process.env.NODE_ENV === 'production') {
    //require and export production set of keys from prod.js (why not directly here?)
    module.exports = require('./prod');
} else {
    // require and export dev.js keys
    module.exports = require('./dev');
}
