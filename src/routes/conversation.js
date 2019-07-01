import express from 'express';
import { 
    PersistConversation, 
    fetchConversationById, 
    fetchMessages, 
    PersistMessage ,
    fetchAllConversations,
    DeleteConversation
} from 'controllers/conversation.controller.js';
import { body, param } from 'express-validator';
import { isValidObjectId } from 'utils';
import { catchValidationError } from 'utils/validation';

const conversations = express.Router();

conversations.get('', catchValidationError, fetchAllConversations);

conversations.get('/:id', param('id').custom(value => isValidObjectId(value)), 
catchValidationError, fetchConversationById);

conversations.get('/:id/messages', param('id').custom(value => isValidObjectId(value)), 
catchValidationError, fetchMessages);

conversations.post('/:id/messages', param('id').custom(value => isValidObjectId(value)), [body('content').exists()]
, catchValidationError, PersistMessage);

conversations.post('',
    body('participants').custom(participants => {
    if (participants) {
        const users = participants.split(',');
        return !users.some(element => !isValidObjectId(element)) && users.length > 1;
    }

    return false;
}), catchValidationError, PersistConversation);

conversations.delete('/:id', param('id').custom(value => isValidObjectId(value))
, catchValidationError, DeleteConversation);

module.exports = conversations;
