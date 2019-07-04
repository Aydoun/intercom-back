import express from 'express';
import { param, query, body} from 'express-validator';
import {
    fetchHistory,
    listStatus,
    listTree,
    submitCommit,
    createBranch,
    getBranch
} from 'controllers/repository.controller';
import { catchValidationError } from 'utils/validation';

const repository = express.Router();

repository.use([
    '/:repoName/history',
    '/:repoName/commit',
    '/:repoName/file',
    '/:repoName/tree',
    '/:repoName/participants',
    '/:repoName/status',
    '/:repoName/summary',
    '/:repoName/file/history',
    '/:repoName/commit/:sha/diff',
], [
    param('repoName').isUUID(),
    query('branch').exists(),
], catchValidationError);

repository.get('/:repoName/history', fetchHistory);
repository.get('/:repoName/status', listStatus);
repository.get('/:repoName/tree', listTree);

repository.post('/:repoName/commit', [
    body('username').exists(),
    body('email').isEmail(),
    body('message').exists(),
], catchValidationError, submitCommit);

repository.get('/:repoName/branch', [
    param('repoName').isUUID(),
], catchValidationError, getBranch);
repository.post('/:repoName/branch', [
    param('repoName').isUUID(),
    query('branch').exists(),
    query('branchName').exists(),
], catchValidationError, createBranch);

module.exports = repository;
