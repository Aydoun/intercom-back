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
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });

module.exports = mongoose.model('plan', PLanSchema);
