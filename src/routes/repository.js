import express from 'express';
import { param, query, body} from 'express-validator';
import {
    fetchHistory,
    listStatus,
    listTree,
    submitCommit,
} from 'controllers/repository.controller';
import { catchValidationError } from 'utils/validation';

const repository = express.Router();

repository.use([
    '/:repoName/history',
    '/:repoName/commit',
    '/:repoName/file',
    '/:repoName/tree',
    '/:repoName/branch',
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

module.exports = repository;
