const mongoose = require('mongoose');
const mongooseSchema = mongoose.Schema;

const Schema = new mongooseSchema({
  message : {type: String , required : true},
  score: { type: Number },
  creator : {type : mongooseSchema.Types.ObjectId , required: true },
}, {timestamps: true});

module.exports = mongoose.model('feedback', Schema);
