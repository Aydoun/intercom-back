import ConversationModel from 'models/conversation.model';

exports.saveConversationImp = (data) => {
  return new ConversationModel(data).save();
};