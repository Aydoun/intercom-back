import mongoose from 'mongoose';

const { Schema } = mongoose;

const IssueComments = new Schema({
  text: { type: String, },
} , {timestamps: true});

const IssueSchema = Schema({
  plan: Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, default: '' },
  comments: [IssueComments],
  status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
}, { timestamps: true });

UserSchema.index({
  plan: 1,
});

module.exports = mongoose.model('issue', IssueSchema);
