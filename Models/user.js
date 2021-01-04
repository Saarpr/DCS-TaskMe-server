const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    googleId: { type: String },
    userName: { type: String },
    thumbnail: { type: String },
}, { collection: 'users' });

const User = model('User', userSchema);

module.exports = User;
