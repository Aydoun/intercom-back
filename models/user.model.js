const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: {
    type: String
  },
  email: {
    type: Boolean,
    default: false
  },
  creation_date: {
    type: Date,
    default: Date.now
  }
});
//Exporting our model
const UserModel = mongoose.model('user', UserSchema, 'user');

module.exports = UserModel;