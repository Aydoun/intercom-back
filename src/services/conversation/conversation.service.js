import {
    saveConversationImp, getConversationByIdImp, getConversationMessagesImp, saveMessageImp, getAllConversationsImp, removeConversationImp,
} from './conversation.service.imp';
  
const saveConversation = saveConversationImp;
const getConversationById = getConversationByIdImp;
const getConversationMessages = getConversationMessagesImp;
const saveMessage = saveMessageImp;
const getAllConversations = getAllConversationsImp;
const removeConversation = removeConversationImp;
  
module.exports = {
  saveConversation,
  getConversationById,
  getConversationMessages,
  saveMessage,
  getAllConversations,
  removeConversation,
};
  