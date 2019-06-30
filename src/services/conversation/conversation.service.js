import {
    saveConversationImp, getConversationByIdImp, getConversationMessagesImp, saveMessageImp, getAllConversationsImp
} from './conversation.service.imp';
  
const saveConversation = saveConversationImp;
const getConversationById = getConversationByIdImp;
const getConversationMessages = getConversationMessagesImp;
const saveMessage = saveMessageImp;
const getAllConversations = getAllConversationsImp
  
module.exports = {
  saveConversation,
  getConversationById,
  getConversationMessages,
  saveMessage,
  getAllConversations,
};
  