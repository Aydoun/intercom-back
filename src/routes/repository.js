import express from 'express';
import { param, query } from 'express-validator';
import {
    fetchHistory
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
], [
    param('repoName').isUUID(),
    query('branch').exists(),
]);

repository.get('/:repoName/history', fetchHistory);

module.exports = repository;
