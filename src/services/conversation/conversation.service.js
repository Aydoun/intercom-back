import {
    saveConversationImp, getConversationByIdImp, getConversationMessagesImp, saveMessageImp
} from './conversation.service.imp';
  
const saveConversation = saveConversationImp;
const getConversationById = getConversationByIdImp;
const getConversationMessages = getConversationMessagesImp;
const saveMessage = saveMessageImp;
  
module.exports = {
  saveConversation,
  getConversationById,
  getConversationMessages,
  saveMessage,
};
  