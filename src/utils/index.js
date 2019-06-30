import { Types } from 'mongoose';
import util from 'util';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
import config from 'config';

const ObjectId = Types.ObjectId;
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

exports.generateToken = userId => jwt.sign({
  id: userId,
}, config.jwtSecret);

exports.getGitPath = repoName => `${config.gitPath}/${repoName}`;

exports.generateHash = data => crypto.createHash('sha256').update(data).digest('hex');

exports.httpCodes = {
  SUCCESS: 200,
  FAILURE: 401,
};
