const jwt = require('jsonwebtoken');
const config = require('config');

exports.signToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    try {
      const decoded = jwt.decode(token, config.secret);
      req.tokenData = decoded;
      next();
      return 0;
    } catch (err) {
      return res.formatResponse({
        message: 'Invalid Token',
      }, 403);
    }
  } else {
    return res.formatResponse({
      message: 'No token provided.',
    }, 403);
  }
};
