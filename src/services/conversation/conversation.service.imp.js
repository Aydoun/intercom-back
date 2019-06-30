import omit from 'object.omit';
import ConversationModel from 'models/conversation.model';
import UserModel from 'models/user.model';
import { generateHash } from 'utils';

exports.saveConversationImp = (data) => {
  let conversationItem;
  let savedConversation;
  const conversationHash = generateHash(data.participants.sort().join(''));

  return ConversationModel.find({ hash: conversationHash })
  .then(conversation => {
    if(conversation.length === 0) {
      return new ConversationModel({ hash: conversationHash, participants: data.participants }).save();
    }
    return conversation;
  })
  .then(conversation => {
    savedConversation = Array.isArray(conversation) ? conversation : [conversation];
    conversationItem = savedConversation[0];
    return UserModel.find({ _id : { $in : data.participants } })
  })
  .then(users => {
    if (users.length > 1) {
      users.forEach(user => {
        user.conversations = user.conversations || [];
        if (conversationItem._id && user.conversations.indexOf(conversationItem._id) < 0) {
          user.conversations.push(conversationItem._id);
          user.save();
        }
      });
    } else {
      throw new Error('Couldnt find users');
    }
  })
  .then(() => conversationItem);
};

exports.getAllConversationsImp = userId => {  
  return UserModel.findById(userId)
  .then(user => {
    return user.conversations || [];
  })
  .then(userConversations => {
    return ConversationModel.find({ _id : { $in : userConversations } });
  })
  .then(conversations => {
    return conversations || [];
  });
};

exports.getConversationByIdImp = id => {
  return ConversationModel.findById(id).lean()
  .then(conversation => {
    return omit(conversation, ['messages']);
  });
};

exports.getConversationMessagesImp = id => {
  return ConversationModel.findById(id)
  .then(conversation => {
    return conversation.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  });
};

exports.saveMessageImp = (id, sender, content) => {
  // Todo prevent send message when user blocked
  return ConversationModel.findById(id)
  .then(conversation => {
    conversation.messages.push({
      content,
      sender
    });
    return conversation.save();
  });
};

exports.removeConversationImp = (id, userId) => {
  return UserModel.findById(userId)
  .then(user => {
    user.conversations = user.conversations.filter(conversation => conversation === id);
    user.save();
  });
};
