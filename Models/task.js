const { Schema, model } = require('mongoose');

const taksSchema = new Schema({
    taskName: { type: String },
    duration: { type: String },
    color: { type: String },
    dateTime: { type: Date },
});

const Task = model('Task', taksSchema);

module.exports = Task;
