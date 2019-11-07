import express from 'express';
import * as C from 'controllers/plan.controller.js';
import { body, query, check } from 'express-validator';
import { catchValidationError } from 'utils/validation';

const plans = express.Router();

plans.get('/search', 
  query('term').exists()
, catchValidationError, C.searchPlan);

plans.get('/:id', [
  check('id').isMongoId(),
], catchValidationError, C.getPlanById);

plans.post('', [
    body('username').exists(),
    body('email').isEmail(),
    body('description').exists(),
    body('title').exists(),
], catchValidationError, C.PersistPlan);

plans.put('/:id', [
  check('id').isMongoId(),
], catchValidationError, C.updateById);

plans.delete('/:id', [
  check('id').isMongoId(),
], catchValidationError, C.removeById);

plans.put('/:id/like', [
  check('id').isMongoId(),
], catchValidationError, C.likePlan);

plans.put('/:id/unregister', [
  check('id').isMongoId(),
], catchValidationError, C.Unregister);

// plans.post('/:id/issues', [
//   check('id').isMongoId(),
//   body('title').exists(),
// ], catchValidationError, C.addIssue);

// plans.get('/:id/issues', [
//   check('id').isMongoId(),
// ], catchValidationError, C.listIssue);

// plans.post('/:id/issues/:issueId/comment', [
//   check('id').isMongoId(),
//   check('issueId').isMongoId(),
//   body('text').isString(),
// ], catchValidationError, C.addIssueComment);


module.exports = plans;
