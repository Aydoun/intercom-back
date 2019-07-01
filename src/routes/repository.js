import express from 'express';
import { param, query } from 'express-validator';
import {
    fetchHistory,
    listStatus,
    listTree,
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
]);

repository.get('/:repoName/history', fetchHistory);
repository.get('/:repoName/status', listStatus);
repository.get('/:repoName/tree', listTree);

module.exports = repository;
