const { Schema, model } = require('mongoose');
const Task = require('../Models/task');

const userSchema = new Schema({
    googleId: { type: String },
    userName: { type: String },
    thumbnail: { type: String },
    tasks: [Task]
}, { collection: 'users' });

const User = model('User', userSchema);

module.exports = User;
