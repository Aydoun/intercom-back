
const { getUser } = require('../services/user/user.service');

exports.userList = (req, res) => {
  getUser(req, res);
};
