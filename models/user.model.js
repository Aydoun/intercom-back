const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
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
  },
  password: {
    type: String,
    required: true,
  },
  status: { type: String, enum: ['Active', 'Inactive', 'Banned'], default: 'Active' },
}, { timestamps: true });

//Exporting our model
const UserModel = mongoose.model('user', UserSchema, 'user');

module.exports = UserModel;
