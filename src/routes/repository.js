import express from 'express';
import { param, query, validationResult, body} from 'express-validator';
import {
    fetchHistory,
    listStatus,
    listTree,
    submitCommit,
} from 'controllers/repository.controller';

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
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.formatResponse({ ...errors.array()[0] }, 401);
    }
    next();
});

repository.get('/:repoName/history', fetchHistory);
repository.get('/:repoName/status', listStatus);
repository.get('/:repoName/tree', listTree);

repository.post('/:repoName/commit', [
    body('username').exists(),
    body('email').isEmail(),
    body('message').exists(),
], submitCommit);

module.exports = repository;
