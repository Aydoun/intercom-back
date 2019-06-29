
import { validationResult } from 'express-validator';
import {
    saveConversation
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

// export const getPlanById = (req, res) => {
//     const { id } = req.params;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.formatResponse({ ...errors.array()[0] }, 401);
//     }

//     getPlan(id)
//     .then(plan => {
//         res.formatResponse(plan);
//     })
//     .catch(err => {
//         res.formatResponse(err.message, 401);
//     });
// };

