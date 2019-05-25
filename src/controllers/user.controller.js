
const {
  getUser, registerUser, loginUser, updateUser, deleteUser,
} = require('../services/user/user.service');
const { isValidObjectId } = require('../utils');

exports.userDetails = (req, res) => {
  const { id } = req.tokenData;
  if (isValidObjectId(id)) {
    return getUser(id)
      .then(user => res.status(200).send(user))
      .catch(err => res.status(401).send(err.message));
  }
  return res.status(401).send('Invalid User Id');
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if ((email && password)) {
    return loginUser(email, password)
      .then(data => res.status(200).send(data))
      .catch(err => res.status(401).send(err.message));
  }
  return res.status(401).send('Missing Data');
};

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  if ((name && email && password)) {
    return registerUser(name, email, password)
      .then(data => res.status(200).send(data))
      .catch(err => res.status(401).send(err.message));
  }
  return res.status(401).send('Missing Data');
};

exports.update = (req, res) => {
  const { id } = req.tokenData;
  updateUser(id, req.body)
    .then(response => res.status(200).send(response))
    .catch(err => res.status(401).send(err.message));
};

exports.remove = (req, res) => {
  const { id } = req.tokenData;
  deleteUser(id)
    .then(response => res.status(200).send(response))
    .catch(err => res.status(401).send(err.message));
};
