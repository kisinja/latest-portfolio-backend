const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    senderFullName: {
        type: String,
        required: true
    },
    senderEmail: {
        type: String,
        required: true
    },
    senderPhoneNumber: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;