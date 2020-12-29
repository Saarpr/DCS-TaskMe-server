const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    googleId: { type: String },
    userName: { type: String },
    thumbnail: { type: String },
    // gender: { type: String },
    // age: { type: String },
    // email: { type: String },
    // avatar: { type: String },
}, { collection: 'users' });

const User = model('User', userSchema);

module.exports = User;
