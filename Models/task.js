const { Schema, model } = require('mongoose');
const searchable = require('mongoose-regex-search');


const tasksSchema = new Schema({
    userId: { String },
    taskName: { type: String , searchable:true },
    durationMin: { type: Number },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date},
    description:{ type: String , searchable:true },
    status: {
        type: { String },
        enum: ['In progress','New','Done'],
        default: 'Active'
    },
    category: {
        type: { String },
        enum: ['Education','Training','Meeting','Home','General'],
        default: 'General'
    }
}, { collection: 'tasks' });

tasksSchema.plugin(searchable);
const Task = model('Task', tasksSchema);

module.exports = Task;