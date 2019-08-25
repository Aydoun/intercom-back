import mongoose from 'mongoose';

const { Schema } = mongoose;

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
  likes: { type: Number, default: 0 },
  avatar: { type: String, default : '' },
  creator: Schema.Types.ObjectId,
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


module.exports = mongoose.model('plan', PLanSchema);
