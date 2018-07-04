const passport = require('passport');

// ROUTES / Route Handler:
module.exports = app => {
    //arrow function with app as argument (app is passed from index.js with express() function)
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    ); // 'google' = strategy name in passport
    // scope: = say what data you want to use / ask for access.

    // It get code from google, send it back, and get accessToken to use in passport.use GoogleStrategy
    // to get user data from google profile
    app.get('/auth/google/callback', passport.authenticate('google'));
    // we can use different callbackURL if we want

    app.get('/api/logout', (req, res) => {
        req.logout(); // function attached by passport to request object. It delete a cookie
        res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user); // passport automatically attach user property to request object
        // res.send(req.session); // we can also see session data used by passport
        // passport takes data form cookie, and deserialize it and save user ID in a session:
        // { -passport: { user: "f0sjf09sjdfjas03q  MongoDB ID  dasdsfwr3wf"} }
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
};
