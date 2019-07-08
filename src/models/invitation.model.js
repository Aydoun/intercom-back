import mongoose from 'mongoose';

const Schema = mongoose.Schema;

module.exports = mongoose.model('invitation', new Schema({
    plan: { type: Schema.Types.ObjectId, required: true },
    requested: { type: Schema.Types.ObjectId, required: true },
    requester: { type: Schema.Types.ObjectId, required: true },
    motivation: { type: String, default: '' },
    planName: { type: String, default: '' },
    planAvatar: { type: String, default: '' },
    status: { type: String, enum: ['Accepted', 'Waiting', 'Rejected'], default: 'Waiting' },
}, { timestamps: true }));
