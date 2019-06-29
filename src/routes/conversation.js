import express from 'express';
import { PersistConversation, fetchConversationById, fetchMessages, PersistMessage } from 'controllers/conversation.controller.js';
import { body, param } from 'express-validator';
import { isValidObjectId } from 'utils';

const conversations = express.Router();

conversations.get('/:id', param('id').custom((value) => {
    if (!isValidObjectId(value)) throw new Error('Passed id is invalid');
    return true;
}), fetchConversationById);

conversations.get('/:id/messages', param('id').custom((value) => {
    if (!isValidObjectId(value)) throw new Error('Passed id is invalid');
    return true;
}), fetchMessages);

conversations.post('/:id/messages', param('id').custom((value) => {
    if (!isValidObjectId(value)) throw new Error('Passed id is invalid');
    return true;
}), [ body('content').exists() ], PersistMessage);

conversations.post('',
    body('participants').custom(participants => {
    const users = participants.split(',');
    
    if (users.some(element => !isValidObjectId(element))) throw new Error('User ids are not valid');
    return true;
}), PersistConversation);


module.exports = conversations;
