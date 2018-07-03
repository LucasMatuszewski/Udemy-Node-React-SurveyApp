const mongoose = require('mongoose');

// const Schema = mongoose.Schema; // ES5
const { Schema } = mongoose; // ES6 Destructuring - shorthand

// Schema - our boilerplate for Objects in this (Users) collection
// MongoDB give us a flexibility of schemaless DB creation.
// But Mongoose want to know what type of data we want to store

const userSchema = new Schema({
    googleId: String,
    name: String,
    email: String,
    surname: String
});

//Create a Collection (name: users) with Schema: userSchema
mongoose.model('users', userSchema);

// module.exports // WE DON'T NEED IT???
