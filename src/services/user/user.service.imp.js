import omit from 'object.omit';
import { securePassword, comparePasswords, generateToken } from 'utils';
import UserModel from 'models/user.model';
import PlanModel from 'models/plan.model';

const FORBIDEN_KEYS = ['password', 'conversations', 'plans', 'privacy'];

exports.getUserImp = id => {
  return UserModel.findById(id).lean()
    .then(user => {
      if (user && user.status === 'Active') {
        const omittedValues = omit(user, FORBIDEN_KEYS);
        return {
          ...omittedValues,
          conversations: user.conversations.length,
          plans: user.plans.length,
        };
      }
    });
};

exports.getUsersPlan = id => {
  return UserModel.findById(id)
    .then(user => {
      if (user && user.status === 'Active') {
        return PlanModel.find({ _id : { $in : user.plans } });
      }
    }); 
};

exports.updateUserImp = (id, newData) => {
  return UserModel.updateOne({ _id: id }, newData)
  .then(() => newData);
};

exports.deleteUserImp = id => {
  return UserModel.updateOne({ _id: id }, { status: 'Inactive' })
  .then(() => ({}));
};

exports.registerUserImp = (name, email, password) => securePassword(password)
  .then((hash) => {
    const newUser = new UserModel({
      name,
      email,
      password: hash,
    });

    return newUser.save();
  })
  .then(user => (({
    ...omit(user.toObject(), FORBIDEN_KEYS),
    token: generateToken(user._id),
  })));

exports.loginUserImp = (email, password) => UserModel.findOne({ email }).lean()
  .then((user) => {
    if (!user || user.status !== 'Active') {
      throw new Error('Authentication failed. User not found.');
    }
    return comparePasswords(password, user.password)
      .then((isMatch) => {
        if (!isMatch) {
          throw new Error('Authentication failed. Wrong Password');
        } else {
          return {
            ...omit(user, FORBIDEN_KEYS),
            token: generateToken(user._id),
          };
        }
      });
  });

exports.changePasswordImp = (id, oldPassword, newPassword) => UserModel.findById(id)
  .then((user) => {
    if (!user || user.status !== 'Active') {
      throw new Error('User Not Found');
    }
    return comparePasswords(oldPassword, user.password)
      .then((isMatch) => {
        if (!isMatch) {
          throw new Error('Wrong Password');
        } 
        return securePassword(newPassword);
      })
      .then((hash) => {
        user.password = hash;
        return user.save();
      });
  });

  exports.addPlan = (id, planId) => {
    return UserModel.findById(id)
    .then(user => {
      user.plans.push(planId);
      user.save();
    });
  };