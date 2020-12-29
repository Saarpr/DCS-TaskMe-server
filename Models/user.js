const { Schema, model } = require('mongoose');
const taksSchema = require('../Models/task');

const userSchema = new Schema({
    googleId: { type: String },
    userName: { type: String },
    thumbnail: { type: String },
    tasks: [taksSchema]
}, { collection: 'users' });

const User = model('User', userSchema);

module.exports = User;
