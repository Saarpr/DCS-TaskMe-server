const { Schema } = require('mongoose');

const taksSchema = new Schema({
    taskName: { type: String },
    duration: { type: String },
    color: { type: String },
    dateTime: { type: Date },
});


module.exports = taksSchema;
