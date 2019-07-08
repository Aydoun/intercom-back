import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Messages = new Schema({
  messageId : Schema.Types.ObjectId,
  content : {type : String, requires: true},
  sender: Schema.Types.ObjectId,
  status : {type : String , enum:['read' , 'unread'] , default : 'unread'}
} , {timestamps: true});

const Conversation = new Schema({
  participants: [Schema.Types.ObjectId],
  hash: { type: String, index: { unique: true } },
  messages: [Messages],
} , {timestamps: true});

module.exports = mongoose.model('conversation', Conversation);
