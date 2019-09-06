import { validationResult } from 'express-validator';

export const catchValidationError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.formatResponse({ ...errors.array()[0] }, 401);
    } else {
        next();
    }
};