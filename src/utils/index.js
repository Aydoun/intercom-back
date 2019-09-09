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

exports.securePassword = plainPassword => genSalt(10)
  .then(salt => hash(plainPassword, salt, null));

exports.comparePasswords = (candidatePassword, storedPAssword) => compare(candidatePassword, storedPAssword);

exports.isValidObjectId = id => ObjectId.isValid(id);

exports.generateToken = userId => jwt.sign({
  id: userId,
}, config.jwtSecret);

exports.getGitPath = repoName => `${config.gitPath}/${repoName}`;

exports.generateHash = data => crypto.createHash('sha256').update(data).digest('hex');

exports.statusToText = status => {
  let words = [];
  
  if (status.isNew()) { words.push("NEW"); }
  else if (status.isModified()) { words.push("MODIFIED"); }
  else if (status.isTypechange()) { words.push("TYPECHANGE"); }
  else if (status.isRenamed()) { words.push("RENAMED"); }
  else if (status.isIgnored()) { words.push("IGNORED"); }

  return words.join(" ");
};

exports.httpCodes = {
  SUCCESS: 200,
  FAILURE: 401,
};

export const intersect = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b)) return [];
  const searchSet = new Set(b);

  return a.filter(x => searchSet.has(x));
};

export const welcomeJson = {
  name: 'intercom api',
};
