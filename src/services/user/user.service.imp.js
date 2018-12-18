const omit = require('object.omit');
const UserModel = require('../../models/user.model');
const { isValidObjectId, securePassword, comparePasswords } = require('../../utils');

const FORBIDEN_KEYS = ['password'];

exports.getUserImp = (id) => {
  if (isValidObjectId(id)) {
    return UserModel.findById(id).lean()
      .then(user => omit(user, FORBIDEN_KEYS));
  }

  throw new Error('User id is not valid');
};

exports.updateUserImp = (id, newData) => UserModel.updateOne({ _id: id }, newData);

exports.deleteUser = id => UserModel.updateOne({ _id: id }, { status: 'Inactive' });

exports.registerUserImp = (name, email, password) => securePassword(password)
  .then((hash) => {
    const newUser = new UserModel({
      name,
      email,
      password: hash,
    });

    return newUser.save();
  })
  .then(user => omit(user.toObject(), FORBIDEN_KEYS));

exports.loginUserImp = (email, password) => UserModel.findOne({ email }).lean()
  .then((user) => {
    if (!user) {
      throw new Error('Authentication failed. User not found.');
    }
    return comparePasswords(password, user.password)
      .then((isMatch) => {
        if (!isMatch) {
          throw new Error('Authentication failed. Wrong Password');
        } else {
          return omit(user, FORBIDEN_KEYS);
        }
      });
  });

exports.changePasswordImp = (id, oldPassword, newPassword) => UserModel.findById(id)
  .then((user) => {
    if (!user) {
      throw new Error('User Not Found');
    }
    return comparePasswords(oldPassword, user.password)
      .then((isMatch) => {
        if (!isMatch) {
          throw new Error('Wrong Password');
        } else {
          return securePassword(newPassword);
        }
      })
      .then((hash) => {
        user.password = hash;
        return user.save();
      });
  });
