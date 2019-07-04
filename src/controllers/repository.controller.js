import * as C from 'services/repository/repository.service';

exports.fetchHistory = (req, res) => {
    const { repoName } = req.params;
    const { branch } = req.query;

    C.getRepositoryHistory(branch, repoName)
    .then(history => {
        res.formatResponse(history);
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};

exports.listStatus = (req, res) => {
    const { repoName } = req.params;

    C.getRepositoryStatus(repoName)
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

    C.getRepositoryTree(branch, repoName)
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
    C.getRepositoryStatus(repoName)
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

exports.createBranch = (req, res) => {
    const { repoName } = req.params;
    const { branch, branchName } = req.query;

    C.addBranch(repoName, branch, branchName)
    .then(response => {
        res.formatResponse(response);
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};

exports.getBranch = (req, res) => {
    const { repoName } = req.params;
    
    C.getBranchList(repoName)
    .then(response => {
        res.formatResponse(response);
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};

exports.removeBranch = (req, res) => {
    const { repoName } = req.params;
    const { branch } = req.query;
    
    C.deleteBranch(repoName, branch)
    .then(response => {
        res.formatResponse(response);
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};

exports.mergeBranch = (req, res) => {
    const { repoName } = req.params;
    const { branch } = req.query;
    const { username, email } = req.body;
    
    C.mergeToMaster(repoName, branch, { username, email })
    .then(response => {
        res.formatResponse(response);
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};

exports.getSummary = (req, res) => {
    const { repoName } = req.params;
    const { repoId } = req.query;
    
    C.getRepositorySummary(repoId, repoName)
    .then(response => {
        res.formatResponse(response);
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};
