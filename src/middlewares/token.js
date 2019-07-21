import jwt from 'jsonwebtoken';
import config from 'config';

// Token Check
const TokenCheck = (req, res, next) => {
    if (process.env.NODE_ENV === 'test') {
      req.tokenData = { id: '5d34bec352a365054575cbee' };
      next();
      return;
    }
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

module.exports = TokenCheck;
