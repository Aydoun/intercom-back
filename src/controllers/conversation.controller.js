
import { validationResult } from 'express-validator';
import {
    saveConversation, getConversationById, getConversationMessages, saveMessage
} from 'services/conversation/conversation.service';

export const PersistConversation = (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.formatResponse({ ...errors.array()[0] }, 401);
    }

    const { participants } = req.body;
    
    saveConversation({ participants: participants.split(',') })
    .then(response => {
        res.formatResponse(response);
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};

export const fetchConversationById = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.formatResponse({ ...errors.array()[0] }, 401);
    }

    const { id } = req.params;

    getConversationById(id)
    .then(plan => {
        res.formatResponse(plan);
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};

export const fetchMessages = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.formatResponse({ ...errors.array()[0] }, 401);
    }

    const { id } = req.params;

    getConversationMessages(id)
    .then(messages => {
        res.formatResponse(messages);
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};

export const PersistMessage = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.formatResponse({ ...errors.array()[0] }, 401);
    }

    const { id: conversationID } = req.params;
    const { id: sender } = req.tokenData;
    const { content } = req.body;

    saveMessage(conversationID, sender, content)
    .then(() => {
        res.formatResponse({});
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};

