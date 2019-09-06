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

export const securePassword = plainPassword => genSalt(10)
  .then(salt => hash(plainPassword, salt, null));

export const comparePasswords = (candidatePassword, storedPAssword) => compare(candidatePassword, storedPAssword);

export const isValidObjectId = id => ObjectId.isValid(id);

export const generateToken = userId => jwt.sign({
  id: userId,
}, config.jwtSecret);

export const getGitPath = repoName => `${config.gitPath}/${repoName}`;

export const generateHash = data => crypto.createHash('sha256').update(data).digest('hex');

export const statusToText = status => {
  let words = [];
  
  if (status.isNew()) { words.push("NEW"); }
  else if (status.isModified()) { words.push("MODIFIED"); }
  else if (status.isTypechange()) { words.push("TYPECHANGE"); }
  else if (status.isRenamed()) { words.push("RENAMED"); }
  else if (status.isIgnored()) { words.push("IGNORED"); }

  return words.join(" ");
};

export const httpCodes = {
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
