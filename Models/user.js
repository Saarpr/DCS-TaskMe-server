const { Schema, model } = require('mongoose');
const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
    taskName: { type: String },
    duration: { type: String },
    color: { type: String },
    dateTime: { type: Date },
});

const userSchema = new Schema({
    googleId: { type: String },
    userName: { type: String },
    thumbnail: { type: String },
    tasks: [tasksSchema]
}, { collection: 'users' });

const User = model('User', userSchema);

module.exports = User;
