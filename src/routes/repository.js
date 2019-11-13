import express from 'express';
import { param, query, body } from 'express-validator';
import * as R from 'controllers/repository.controller';
import { catchValidationError } from 'utils/validation';

const repository = express.Router();

repository.use([
    '/:repoName/history', // Done
    '/:repoName/commit', // Done
    '/:repoName/file', // Done
    '/:repoName/tree', // Done
    '/:repoName/participants',
    '/:repoName/status', // Done
    '/:repoName/merge', // Done
    '/:repoName/file/history', // Postponed
    '/:repoName/commit/:sha/diff', // Postponed
], [
    param('repoName').isUUID(),
], catchValidationError);

repository.get('/:repoName/history', R.fetchHistory);
repository.get('/:repoName/status', R.listStatus);
repository.get('/:repoName/tree', R.listTree);
repository.get('/:repoName/branch', [
  param('repoName').isUUID(),
], catchValidationError, R.getBranch);
repository.get('/:repoName/summary', [
  param('repoName').isUUID(),
  query('repoId').exists(),
], catchValidationError, R.getSummary);
repository.get('/:repoName/file', [
  param('repoName').isUUID(),
  query('fileName').exists(),
  query('branch').exists(),
  query('sha').exists(),
], catchValidationError, R.getFileContent);
repository.get('/:repoName/walk', [
  param('repoName').isUUID(),
  query('sha').exists(),
], catchValidationError, R.walkTree);

repository.post('/:repoName/commit', [
    body('username').exists(),
    body('email').isEmail(),
    body('message').exists(),
    body('branch').exists(),
], catchValidationError, R.submitCommit);
repository.post('/:repoName/branch', [
    param('repoName').isUUID(),
    query('branch').exists(),
    query('branchName').exists(),
], catchValidationError, R.createBranch);
repository.post('/:repoName/merge', [
    body('username').exists(),
    body('email').isEmail(),
], catchValidationError, R.mergeBranch);

repository.delete('/:repoName/branch', [
  param('repoName').isUUID(),
  query('branch').exists(),
], catchValidationError, R.removeBranch);

module.exports = repository;
