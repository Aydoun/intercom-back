import { 
    getRepositoryHistory,
    getRepositoryStatus,
    getRepositoryTree,
    commit,
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

exports.submitCommit = (req, res) => {
    const { repoName } = req.params;
    const { branch } = req.query;
    const { username, email, message } = req.body;
    // TODO: Remove Status Check for empty commits!
    getRepositoryStatus(repoName)
    .then(response => {
        if (Object.keys(response).length !== 0) {
            return commit(branch, repoName, { username, email }, message);
        } 
    })
    .then(commit => {
        res.formatResponse(commit ? commit.tostrS() : {});
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};