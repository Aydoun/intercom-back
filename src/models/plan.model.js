import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;

const IssueComments = new Schema({
  text: { type: String, },
  creator: Schema.Types.ObjectId,
} , {timestamps: true});

const IssueSchema = Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  comments: { type: [IssueComments], default: [] },
  creator: { type: Schema.Types.ObjectId, required: true },
  status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
}, { timestamps: true });

const PLanSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  repoName: {
    type: String,
    required: true,
  },
  likes: { type: [Schema.Types.ObjectId], default: [] },
  avatar: { type: String, default : '' },
  creator: Schema.Types.ObjectId,
  issues: { type: [IssueSchema], default: [] },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });

PLanSchema.index({
  title: 'text',
  description: 'text',
}, {
  weights: {
    title: 5,
    description: 1,
  },
});

PLanSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('plan', PLanSchema);
