const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    sender: { type: String },
    receiver: {type: String },
    date: { type: Date },
    content: { type: String },
    read: {type: Boolean, default: false }
});

module.exports = mongoose.model('Chat', chatSchema);