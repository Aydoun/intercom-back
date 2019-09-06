import mongoose from 'mongoose';

const { Schema } = mongoose;

const LikesSchema = Schema({
  planId: { type: Schema.Types.ObjectId, required: true },
  usersList: [Schema.Types.ObjectId], 
});

LikesSchema.index({planId: 1});

module.exports = mongoose.model('likes', LikesSchema);
