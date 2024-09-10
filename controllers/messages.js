const Message = require('../models/Message');

// Create a new message
const createMessage = async (req, res) => {
    try {
        const { senderFullName, senderEmail, senderPhoneNumber, subject, message } = req.body;

        let emptyFields = [];

        if (!senderFullName) emptyFields.push('senderFullName');
        if (!senderEmail) emptyFields.push('senderEmail');
        if (!senderPhoneNumber) emptyFields.push('senderPhoneNumber');
        if (!subject) emptyFields.push('subject');
        if (!message) emptyFields.push('message');

        if (emptyFields.length > 0) {
            return res.status(400).json({ error: 'Please fill in all the required fields !!', emptyFields });
        }

        // Manually create a new Message instance and save
        const newMessage = new Message({
            senderFullName,
            senderEmail,
            senderPhoneNumber,
            subject,
            message
        });

        await newMessage.save();

        return res.status(201).json({ message: "Message sent successfully !", newMessage });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
};


// Get all messages
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find();

        if (!messages) {
            return res.status(404).json({ error: 'No messages found' });
        }

        return res.status(200).json({ messages });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
};

// Get a single message
const getMessageById = async (req, res) => {
    const { id } = req.params;

    try {
        const message = await Message.findById(id);

        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        return res.status(200).json({ message });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
};

// Delete a message
const deleteMessage = async (req, res) => {
    const { id } = req.params;

    try {
        const message = await Message.findByIdAndDelete(id);

        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        return res.status(200).json({ message });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createMessage,
    getMessages,
    getMessageById,
    deleteMessage
};