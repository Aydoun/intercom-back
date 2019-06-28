
import { validationResult } from 'express-validator';
import {
  getUser, registerUser, loginUser, updateUser, deleteUser,
} from 'services/user/user.service';
import { isValidObjectId } from 'utils';

exports.userDetails = (req, res) => {
  const { id } = req.tokenData;

  if (isValidObjectId(id)) {
    return getUser(id)
      .then(user => res.formatResponse(user))
      .catch(err => res.formatResponse(err.message, 401));
  }
  return res.formatResponse('Invalid User Id', 401);
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.formatResponse({ errors: errors.array() }, 401);
  }

  return loginUser(email, password)
    .then(data => res.formatResponse(data))
    .catch(err => res.formatResponse(err.message, 401));
};

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  if ((name && email && password)) {
    return registerUser(name, email, password)
      .then(data => res.formatResponse(data))
      .catch(err => res.formatResponse(err.message, 401));
  }
  return res.formatResponse('Missing Data', 401);
};

exports.update = (req, res) => {
  const { id } = req.tokenData;
  updateUser(id, req.body)
    .then(response => res.formatResponse(response))
    .catch(err => res.formatResponse(err.message, 401));
};

exports.remove = (req, res) => {
  const { id } = req.tokenData;
  deleteUser(id)
    .then(response => res.formatResponse(response))
    .catch(err => res.formatResponse(err.message, 401));
};
