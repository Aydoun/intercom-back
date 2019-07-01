import { validationResult } from 'express-validator';
import { getRepositoryHistory } from 'services/repository/repository.service';

exports.fetchHistory = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.formatResponse({ ...errors.array()[0] }, 401);
    }
    const { repoName } = req.params;
    const { branch } = req.query;

    getRepositoryHistory(branch, repoName)
    .then(history => {
        res.formatResponse(history);
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};

