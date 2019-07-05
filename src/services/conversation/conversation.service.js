import * as C from './conversation.service.imp';
  
exports.saveConversation = C.saveConversationImp;
exports.getConversationById = C.getConversationByIdImp;
exports.getConversationMessages = C.getConversationMessagesImp;
exports.saveMessage = C.saveMessageImp;
exports.getAllConversations = C.getAllConversationsImp;
exports.removeConversation = C.removeConversationImp;
  