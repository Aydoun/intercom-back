import { param, query } from 'express-validator';

// const routes = [
//     '/:repoName/history',
//     '/:repoName/commit',
//     '/:repoName/file',
//     '/:repoName/tree',
//     '/:repoName/participants',
//     '/:repoName/status',
//     '/:repoName/merge',
//     '/:repoName/file/history',
//     '/:repoName/commit/:sha/diff',
//     '/:repoName/commit',
//     '/:repoName/branch',
//     '/:repoName/merge',
//     '/:repoName/summary',
// ];

module.exports = {
    '/:repoName/history' : [
        param('repoName').isUUID(),
        query('branch').exists()
    ],

};