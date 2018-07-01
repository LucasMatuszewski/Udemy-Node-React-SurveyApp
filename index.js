const express = require('express'); //common JS modules are used by Node.js (ES5)

// Node / Express don't supports ES6 import of modules:
// import express from 'express';
// there are some modules to make Node/Express works with ES6

const app = express();

// Routes / Route Handler:
app.get('/', (req, res) => {
    // callback arrow function
    res.send({ id: 'Hello' }); //JSON data
});
/**
 * app.get      - Get info
 * app.post     - Send info
 * app.put      - update all properties of something
 * app.delete   - delete something
 * app.patch    - update one or two properties of sth
 *
 * req - object representing incoming request
 * res - object representing the outgoing response
 */

const PORT = process.env.PORT || 5000;

// Express tells Node.js to listen on port 5000
app.listen(PORT, () => {
    console.log('Listen on port: ' + PORT);
});
