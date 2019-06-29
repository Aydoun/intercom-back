import {
    saveConversationImp, getConversationByIdImp
} from './conversation.service.imp';
  
const saveConversation = saveConversationImp;
const getConversationById = getConversationByIdImp;
  
module.exports = {
  saveConversation,
  getConversationById,
};
  