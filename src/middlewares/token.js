import jwt from 'jsonwebtoken';
import config from 'config';

const TokenCheck = (req, res, next) => {
  const token = req.headers['x-api-key'] || req.query.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      req.tokenData = decoded;
      next();
    } catch (err) {
      res.formatResponse({ message: 'Invalid Token' }, 403);
    }
  } else {
    return res.formatResponse({ message: 'No token provided.' }, 403);
  }
};

export default TokenCheck;
