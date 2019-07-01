import { 
    getRepositoryHistory,
    getRepositoryStatus,
} from 'services/repository/repository.service';

exports.fetchHistory = (req, res) => {
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

exports.listStatus = (req, res) => {
    const { repoName } = req.params;
    const { branch } = req.query;

    getRepositoryStatus(branch, repoName)
    .then(status => {
        res.formatResponse(status);
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};
