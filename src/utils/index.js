const { Types: { ObjectId } } = require('mongoose');
const util = require('util');
const bcrypt = require('bcrypt-nodejs');

const genSalt = util.promisify(bcrypt.genSalt);
const hash = util.promisify(bcrypt.hash);
const compare = util.promisify(bcrypt.compare);

exports.formatter = (data, error) => {
  if (!error) {
    return {
      status: !error,
      result: data,
    };
  }

  return {
    status: !error,
    result: {
      message: error.message,
    },
  };
};

exports.securePassword = plainPassword => genSalt(10)
  .then(salt => hash(plainPassword, salt, null));

exports.comparePasswords = (candidatePassword, storedPAssword) => compare(candidatePassword, storedPAssword);

exports.isValidObjectId = id => ObjectId.isValid(id);

exports.httpCodes = {
  SUCCESS: 200,
  FAILURE: 401,
};
