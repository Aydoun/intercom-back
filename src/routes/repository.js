import express from 'express';
import { param, query, body } from 'express-validator';
import * as R from 'controllers/repository.controller';
import { catchValidationError } from 'utils/validation';

const repository = express.Router();

repository.use([
    '/:repoName/history', // Done
    '/:repoName/commit', // Done
    '/:repoName/file',
    '/:repoName/tree', // Done
    '/:repoName/participants',
    '/:repoName/status', // Done
    '/:repoName/merge', // Done
    '/:repoName/file/history', // Postponed
    '/:repoName/commit/:sha/diff', // Postponed
], [
    param('repoName').isUUID(),
    query('branch').exists(),
], catchValidationError);

repository.get('/:repoName/history', R.fetchHistory);
repository.get('/:repoName/status', R.listStatus);
repository.get('/:repoName/tree', R.listTree);

repository.post('/:repoName/commit', [
    body('username').exists(),
    body('email').isEmail(),
    body('message').exists(),
], catchValidationError, R.submitCommit);

repository.get('/:repoName/branch', [
    param('repoName').isUUID(),
], catchValidationError, R.getBranch);

repository.post('/:repoName/branch', [
    param('repoName').isUUID(),
    query('branch').exists(),
    query('branchName').exists(),
], catchValidationError, R.createBranch);

repository.delete('/:repoName/branch', [
    param('repoName').isUUID(),
    query('branch').exists(),
], catchValidationError, R.removeBranch);

repository.post('/:repoName/merge', [
    body('username').exists(),
    body('email').isEmail(),
], catchValidationError, R.mergeBranch);

repository.get('/:repoName/summary', [
    param('repoName').isUUID(),
    query('repoId').exists(),
], catchValidationError, R.getSummary);

module.exports = repository;
