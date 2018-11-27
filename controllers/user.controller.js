
const { formatter } = require('../utils');
const { getUser } = require('../services/user/user.service');

exports.userList = (req, res, next) => {
    getUser(req, res);
};
