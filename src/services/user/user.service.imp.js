import omit from 'object.omit';
import _intersectionWith from 'lodash.intersectionwith';
import { securePassword, comparePasswords, generateToken } from 'utils';
import { ActivityPoint } from 'constants';
import UserModel from 'models/user.model';
import PlanModel from 'models/plan.model';

const FORBIDEN_USERS_KEYS = ['password', 'conversations', 'plans', 'privacy', 'likes'];


export const getUserImp = id => {
  return UserModel.findById(id).lean()
    .then(user => {
      if (user && user.status === 'Active') {
        const omittedValues = omit(user, FORBIDEN_USERS_KEYS);
        return {
          ...omittedValues,
          conversations: user.conversations.length,
          plans: user.plans.length,
          likes: Object.keys(user.likes || {}).length,
        };
      }
    });
};

export const getUsersPlan = id => {
  return UserModel.findById(id)
    .then(user => {
      if (user && user.status === 'Active') {
        return PlanModel.paginate({ _id: { $in: user.plans } }, { lean: true });
      }
    });
};

export const searchUser = term => {
  return UserModel.paginate({ $text: { $search: term }, status: 'Active' }, { page: 1, limit: 10, lean: true })
    .then(users => {
      const { docs, ...rest } = users;
      const strippedDocs = docs.map(user => {
        const omittedValues = omit(user, FORBIDEN_USERS_KEYS);
        return {
          ...omittedValues,
          conversations: user.conversations.length,
          plans: user.plans.length,
        };
      });

      return {
        docs: strippedDocs,
        ...rest,
      };
    });
};

export const updateUserImp = (id, newData) => {
  return UserModel.findByIdAndUpdate(id, newData)
    .then(document => {
      const newDocument = Object.assign({}, document.toObject(), newData);
      const { bio, name } = newDocument;

      if (
        !newDocument.profileCompleted &&
        bio &&
        name
      ) {
        document.profileCompleted = true;
        return document.save()
        .then(() => ({ ...newData, value: ActivityPoint.completeProfile }));
      }

      return newData;
    });
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
    _id: user._id,
    token: generateToken(user._id),
  })));

export const loginUserImp = (email, password) => UserModel.findOne({ email }).lean()
  .then(user => {
    if (!user || user.status !== 'Active') {
      throw new Error('Authentication failed. User not found.');
    }
    return comparePasswords(password, user.password)
      .then(isMatch => {
        if (!isMatch) {
          throw new Error('Authentication failed. Wrong Password');
        } else {
          return {
            token: generateToken(user._id),
          };
        }
      });
  });

export const changePasswordImp = (id, oldPassword, newPassword) => UserModel.findById(id)
  .then(user => {
    if (!user || user.status !== 'Active') {
      throw new Error('User Not Found');
    }
    return comparePasswords(oldPassword, user.password)
      .then(isMatch => {
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

export const getIntersection = (mainUser, otherUsers) => {
  const toArray = otherUsers.split(',');
  let response = {};

  return UserModel.find({ _id: { $in: [mainUser, ...toArray] } })
    .then(users => {
      if (users.length > 0) {
        const mainUserPlans = users[0].plans;

        // Skip the user himself
        users.slice(1).forEach(user => {
          response[user._id] = _intersectionWith(user.plans, mainUserPlans, (a, b) => a.toString() === b.toString()).length;
        });
      }

      return response;
    });
};
