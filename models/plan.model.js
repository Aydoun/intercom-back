const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PLanSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {type : String , enum: ['Active', 'Inactive'] , default : 'Active'},
}, {timestamps: true});
//Exporting our model
const PLanModel = mongoose.model('plan', PLanSchema);

module.exports = PLanModel;
