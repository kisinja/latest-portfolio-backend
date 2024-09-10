const express = require('express');

const router = express.Router();

const { createMessage, getMessages, getMessageById, deleteMessage } = require('../controllers/messages');

router.post('/create', createMessage);

router.get('/all', getMessages);

router.get('/:id', getMessageById);

router.delete('/:id', deleteMessage);

module.exports = router;