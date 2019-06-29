import ConversationModel from 'models/conversation.model';

exports.saveConversationImp = (data) => {
  return new ConversationModel(data).save();
};

exports.getConversationByIdImp = id => {
  return ConversationModel.findById(id);
};

exports.getConversationMessagesImp = id => {
  return ConversationModel.findById(id)
  .then(conversation => {
    return conversation.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  });
};

exports.saveMessageImp = (id, sender, content) => {
  return ConversationModel.findById(id)
  .then(conversation => {
    conversation.messages.push({
      content,
      sender
    });
    return conversation.save();
  });
};
