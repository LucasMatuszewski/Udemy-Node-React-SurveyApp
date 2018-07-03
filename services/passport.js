const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// Fetch data from DB with mongoose (one argument = name of Collection)
// --> two arguments means we want to put something to a DB.
// --> one argument = fetch data from DB
const User = mongoose.model('users'); // mongoose will automatically look in folder /models/ for Users.js file
// User is a Class (Upper Case name convention)

// Make a Token to save in Cookie for logged in User (User session is identified by cookie).
// In our case we use user.id as a token, but it could be an email or other unique value
// this user.id is serialized = hashed to some other string (and unhashed on deserialize)
passport.serializeUser((user, done) => {
    //user = object send as a second argument of done() in GoogleStrategy, taken from our MongoDB
    done(null, user.id); // user id from our MongoDB (no the same as GoogleId)
    // user.id is a shortcut for user._id.$oid from our MongoDB
});

// Take a Token (id) from Cookie/Session, unhash it and check if we have a user with this user.id in our DB. If yes - authorize
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

// Passport serialize / deserialize User:
// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize

// Tell passport to use OAuth saved in GoogleStrategy:
// module.exports = passport.use( // WE DON'T NEED TO EXPORT IT ??????
passport.use(
    new GoogleStrategy( // new = Create new instance of GoogleStrategy
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            // Check if user with this Google ID already exists in our DB
            User.findOne({ googleId: profile.id }) // Asynchronous Query
                // findOne returns a Promise, so we use .then on success
                .then(existingUser => {
                    // then is async = start immediately, but return when Promise finished work
                    if (existingUser) {
                        // done (property for GoogleStrategy Callback) tells Passport: SignUp is done
                        done(null, existingUser); //done(err, return)
                    } else {
                        // create new object of class User (Model Instance)
                        new User({
                            googleId: profile.id,
                            name: profile.name.givenName,
                            surname: profile.name.familyName,
                            email: profile.emails[0].value
                            // new User creates Mongoose Model Instance inside JS, but not saved to DB
                        })
                            .save() // We have to use .save() to send data to DB
                            //after async save() finish its work, .then() will callback done() to Passport
                            .then(
                                user => done(null, user),
                                error => console.log(error)
                            );
                    }
                });

            console.log('access token:', accessToken);
            // it will print token from Google after authentication and redirect to:
            // URL/auth/google/callback
            console.log('refresh token:', refreshToken);
            console.log('profile:', profile);
        }
    )
);