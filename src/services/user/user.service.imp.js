import omit from 'object.omit';
import { securePassword, comparePasswords, generateToken } from 'utils';
import UserModel from 'models/user.model';
import PlanModel from 'models/plan.model';

const FORBIDEN_USERS_KEYS = ['password', 'conversations', 'plans', 'privacy'];
const FORBIDEN_PLANS_KEYS = ['likes'];

export const getUserImp = id => {
  return UserModel.findById(id).lean()
    .then(user => {
      if (user && user.status === 'Active') {
        const omittedValues = omit(user, FORBIDEN_USERS_KEYS);
        return {
          ...omittedValues,
          conversations: user.conversations.length,
          plans: user.plans.length,
        };
      }
    });
};

export const getUsersPlan = id => {
  return UserModel.findById(id)
    .then(user => {
      if (user && user.status === 'Active') {
        return PlanModel.find({ _id : { $in : user.plans } }).lean()
        .then(plans => {
          return plans.map(plan => {
            const omittedValues = omit(plan, FORBIDEN_PLANS_KEYS);
            return {
              ...omittedValues,
              likes: plan.likes && plan.likes.length,
            };
          });
          
        });
      }
    }); 
};

export const searchUser = term => {
  return UserModel.find({ $text: { $search: term },  status: 'Active'}).lean()
  .then(users => {
    return users.map(user => {
      const omittedValues = omit(user, FORBIDEN_USERS_KEYS);
      return {
        ...omittedValues,
        conversations: user.conversations.length,
        plans: user.plans.length,
      };
    });
  });
};

export const updateUserImp = (id, newData) => {
  return UserModel.updateOne({ _id: id }, newData)
  .then(() => newData);
};

export const deleteUserImp = id => {
  return UserModel.updateOne({ _id: id }, { status: 'Inactive' })
  .then(() => ({}));
};

export const registerUserImp = (name, email, password) => securePassword(password)
  .then((hash) => {
    const newUser = new UserModel({
      name,
      email,
      password: hash,
    });

    return newUser.save();
  })
  .then(user => (({
    ...omit(user.toObject(), FORBIDEN_USERS_KEYS),
    token: generateToken(user._id),
  })));

export const loginUserImp = (email, password) => UserModel.findOne({ email }).lean()
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
            ...omit(user, FORBIDEN_USERS_KEYS),
            token: generateToken(user._id),
          };
        }
      });
  });

export const changePasswordImp = (id, oldPassword, newPassword) => UserModel.findById(id)
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

  export const addPlan = (id, planId) => {
    return UserModel.findById(id)
    .then(user => {
      user.plans.push(planId);
      user.save();
    });
  };