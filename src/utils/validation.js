import { validationResult } from 'express-validator';

exports.catchValidationError = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.formatResponse({ ...errors.array()[0] }, 401);
    }
};