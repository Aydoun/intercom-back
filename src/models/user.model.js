import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = Schema({
  name: { type: String, required: true },
  sexe: { type: Number, enum: [0, 1, -1], default: 0 },
  addresses: [String],
  contactInfo: [String],
  phone: [String],
  profession: { type: String },
  bio: { type: String, default: '' },
  privacy: { type: Array, default: [] },
  avatar: { type: String, default: '' },
  email: {
    type: String,
    required: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  conversations: [Schema.Types.ObjectId],
  status: { type: String, enum: ['Active', 'Inactive', 'Banned'], default: 'Active' },
}, { timestamps: true });

module.exports = mongoose.model('user', UserSchema, 'user');
