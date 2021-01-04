const { Schema, model } = require('mongoose');

const tasksSchema = new Schema({
    userId: { String },
    taskName: { type: String },
    durationMin: { type: Number },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date},
    description:{ String },
    category: {
        type: { String },
        enum: ['Education','Training','Meeting','Home','General'],
        default: 'General'
    }
}, { collection: 'tasks' });

const Task = model('Task', tasksSchema);

module.exports = Task;