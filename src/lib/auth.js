const jwt = require('jsonwebtoken');
const config = require('../config');

exports.signToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    try {
      const decoded = jwt.decode(token, config.secret);
      req.tokenData = decoded;
      next();
    } catch (err) {
      return res.status(403).send({
        status: false,
        message: 'Invalid Token',
      });
    }
  } else {
    return res.status(403).send({
      status: false,
      message: 'No token provided.',
    });
  }
  next();
};
