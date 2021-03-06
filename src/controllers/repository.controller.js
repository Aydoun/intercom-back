import * as S from 'services/repository/repository.service';

export const fetchHistory = (req, res) => {
  const { repoName } = req.params;
  const { branch } = req.query;

  S.getRepositoryHistory(branch, repoName)
    .then(history => {
      res.formatResponse(history);
    })
    .catch(err => {
      res.formatResponse(err.message + ' /messg', 401);
    });
};

export const listStatus = (req, res) => {
  const { repoName } = req.params;

  S.getRepositoryStatus(repoName)
    .then(status => {
      res.formatResponse(status);
    })
    .catch(err => {
      res.formatResponse(err.message, 401);
    });
};

export const listTree = (req, res) => {
  const { repoName } = req.params;
  const { branch, sha } = req.query;

  S.getRepositoryTree(branch, repoName, sha)
    .then(tree => res.formatResponse(tree))
    .catch(err => res.formatResponse(err.message, 401));
};

export const submitCommit = (req, res) => {
  const { repoName } = req.params;
  const { username, email, message, branch } = req.body;
  // TODO: Remove Status Check for empty commits!
  return S.getRepositoryStatus(repoName)
    .then(response => {
      if (Object.keys(response).length !== 0) {
        return S.commit(branch, repoName, { username, email }, message);
      }
    })
    .then(commit => {
      res.formatResponse(commit ? commit.tostrS() : undefined);
    })
    .catch(err => {
      res.formatResponse(err.message, 401);
    });
};

export const createBranch = (req, res) => {
  const { repoName } = req.params;
  const { branch } = req.body;

  S.addBranch(repoName, branch)
    .then(response => res.formatResponse({ branch: response }))
    .catch(err => res.formatResponse(err.message, 401));
};

export const getBranch = (req, res) => {
  const { repoName } = req.params;

  S.getBranchList(repoName)
    .then(response => {
      res.formatResponse(response);
    })
    .catch(err => {
      res.formatResponse(err.message, 401);
    });
};

export const removeBranch = (req, res) => {
  const { repoName } = req.params;
  const { branch } = req.body;

  S.deleteBranch(repoName, branch)
    .then(response => {
      res.formatResponse(response);
    })
    .catch(err => {
      res.formatResponse(err.message, 401);
    });
};

export const mergeBranch = (req, res) => {
  const { repoName } = req.params;
  const { branch } = req.query;
  const { username, email } = req.body;

  S.mergeToMaster(repoName, branch, { username, email })
    .then(response => {
      res.formatResponse(response);
    })
    .catch(err => {
      res.formatResponse(err.message, 401);
    });
};

export const getSummary = (req, res) => {
  const { repoName } = req.params;
  const { repoId } = req.query;

  S.getRepositorySummary(repoId, repoName)
    .then(response => {
      res.formatResponse(response);
    })
    .catch(err => {
      res.formatResponse(err.message, 401);
    });
};

export const getFileContent = (req, res) => {
  const { repoName } = req.params;
  const { fileName, sha } = req.query;

  S.readFile(repoName, fileName, sha)
    .then(response => {
      res.formatResponse(
        response
          .toString()
          .split('\n')
          .filter(Boolean)
      );
    })
    .catch(err => {
      res.formatResponse(err.message, 401);
    });
};

export const walkTree = (req, res) => {
  const { repoName } = req.params;
  const { sha } = req.query;

  S.walkRepoTree(repoName, sha)
    .then(response => {
      res.formatResponse(response);
    })
    .catch(err => {
      res.formatResponse(err.message, 401);
    });
};
