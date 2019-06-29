import express from 'express';
import { PersistConversation } from 'controllers/conversation.controller.js';
import { body } from 'express-validator';
import { isValidObjectId } from 'utils';

const conversations = express.Router();

conversations.post('',
    body('participants').custom(participants => {
    const users = participants.split(',');
    
    if (users.some(element => !isValidObjectId(element))) throw new Error('User ids are not valid');
    return true;
}), PersistConversation);


module.exports = conversations;
