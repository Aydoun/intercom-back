import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
  },
  sexe: { type: Number, enum: [0, 1, -1], default: 0 },
  addresses: { type: Array },
  contactInfo: { type: Array },
  phone: { type: String },
  profession: { type: String },
  bio: { type: String },
  privacy: { type: Array },
  avatar: { type: String, default: '' },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  status: { type: String, enum: ['Active', 'Inactive', 'Banned'], default: 'Active' },
}, { timestamps: true });

module.exports = mongoose.model('user', UserSchema, 'user');
