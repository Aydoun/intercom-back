import { 
    getRepositoryHistory,
    getRepositoryStatus,
    getRepositoryTree,
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

    getRepositoryStatus(repoName)
    .then(status => {
        res.formatResponse(status);
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};

exports.listTree = (req, res) => {
    const { repoName } = req.params;
    const { branch } = req.query;

    getRepositoryTree(branch, repoName)
    .then(tree => {
        res.formatResponse(tree);
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};
