const express = require('express'); //common JS modules are used by Node.js (ES5)
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); // module to use cookies to store a session data
const passport = require('passport'); // we need passport here to tell it to use cookie
const keys = require('./config/keys');

// Node / Express don't supports ES6 import of modules:
// import express from 'express';
// there are some modules to make Node/Express works with ES6

const PORT = process.env.PORT || 5000;

// const authRoutes = require('./routes/authRoutes'); //We will use a shorthand without const
require('./models/User'); // User Schema is used in passport.js so it have to be required first
require('./services/passport'); // we don't need to save it inside any variable.

// DON'T COMMIT MongoDB login data TO GITHUB!
mongoose.connect(keys.mongoURI);

const app = express();

// Tell Express to use a Cookies for sessions:
app.use(
    cookieSession({
        //how long cookie will be fresh (in milliseconds = 30 days)
        maxAge: 30 * 24 * 60 * 60 * 1000, // days * 24h * 60min * 60s * 1000milliseconds
        //unique key to identify user, it generate a keys randomly from a string provided by us
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize()); // we start passport on user visit
app.use(passport.session()); // we start passport session on user visit

//ROUTES:

// start Router and pass Express app to it (don't need to import app=express inside router):
//authRoutes(app);
//SHORTHAND:
require('./routes/authRoutes')(app);

////////////// MY VERSION (based on React 2nd Budget - Udemy course) ////////////////////
// I was trying to make a static server for React App (it was working on DEV but without OAuth)
const path = require('path'); //Node method to get a root path to a folder where this file is (depending on a computer/server where it is)
//create a absolute path to a directory with our public folder:
const publicPath = path.join(__dirname, 'client', 'build');
// Set default folder with static files for our app
app.use(express.static(publicPath));
// Route to our REACT App
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});
/////////////////////////////// END OF MY VERSION ///////////////////////////////////////

// Express tells Node.js to listen on port 5000
app.listen(PORT, () => {
    console.log('Listen on port: ' + PORT);
});
