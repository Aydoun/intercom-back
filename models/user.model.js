const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // salt: {
  //   type: String,
  //   required: true,
  // }
}, {timestamps: true});
//Exporting our model
const UserModel = mongoose.model('user', UserSchema, 'user');

module.exports = UserModel;
