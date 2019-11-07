import mongoose from 'mongoose';

const { Schema } = mongoose;

// const AwardHistory = new Schema({
//   actionType: { type: String, },
//   value: { type: Number },
// } , {timestamps: true});

const startingPoints = 100;
// const registerActivity = {
//   actionType: 'register',
//   value: startingPoints,
// };

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
  points: { type: Number, default: startingPoints},
  conversations: [Schema.Types.ObjectId],
  plans: [Schema.Types.ObjectId],
  status: { type: String, enum: ['Pending', 'Active', 'Inactive', 'Banned'], default: 'Active' },
  profileCompleted: { type: Boolean, default: false },
  likes: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: true });

UserSchema.index({
  name: 'text',
});

module.exports = mongoose.model('user', UserSchema, 'user');
