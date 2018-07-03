////////////////////////////////////////
// PROD Keys - DON'T COMMIT IT !!!!! //
//////////////////////////////////////
// Deferent keys then for DEV,
// taken from our production Environment Variables (e.g. from Heroku)

// ENV Variables - convention to type it UPPERCASE_CAMEL

module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY
};
