import mongoose from 'mongoose';

const { Schema } = mongoose;

const ActivityHistory = new Schema({
  actionType: { type: Number },
  value: { type: Number },
} , {timestamps: true});

const ActivitySchema = Schema({
  user: Schema.Types.ObjectId,
  history: { type: [ActivityHistory] },
}, { timestamps: true });

module.exports = mongoose.model('activity', ActivitySchema);
