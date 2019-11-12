import nodegit from 'nodegit';
import path from 'path';
import fse from 'fs-extra';
import { getGitPath, statusToText } from 'utils';
import PlanModel from 'models/plan.model';

export const createRepositoryImp = (creator, repoName, repoDescription, initialMessage) => {
    const fileName = "README.md";
    const fileContent = repoDescription;
    const repoDir = getGitPath(repoName);
    const { username, email } = creator;

  let repository;
  let index;

  return fse.ensureDir(path.resolve(__dirname, repoDir))
    .then(() => {
      return nodegit.Repository.init(path.resolve(__dirname, repoDir), 0);
    })
    .then(repo => {
      repository = repo;
      fse.outputFileSync(path.join(repository.workdir(), fileName), fileContent);
      return repository.refreshIndex();
    })
    .then(idx => {
      index = idx;
    })
    .then(function () {
      return index.addByPath(fileName);
    })
    .then(function () {
      return index.write();
    })
    .then(function () {
      return index.writeTree();
    })
    .then(oid => {
      const author = nodegit.Signature.now(username, email);
      const committer = nodegit.Signature.now(username, email);

      return repository.createCommit("HEAD", author, committer, initialMessage, oid, []);
    });
};

export const getRepositoryHistoryImp = (branch, repoName) => {
    const repoDir = getGitPath(repoName);
    
    return nodegit.Repository.open(repoDir)
    .then(repository => {
      return repository.getBranchCommit(branch);
    })
    .then(firstCommit => {
      const history = firstCommit.history(nodegit.Revwalk.SORT.Time);

      return new Promise(resolve => {
        history.on('end', commits => {
          const logs = commits.map(commit => {
            return {
              sha: commit.sha(),
              author: commit.author().name(),
              email: commit.author().email(),
              date: commit.date(),
              comment: commit.message()
            };
          });
          resolve(logs);
        });

        history.start();
      });
    });
};

export const getRepositoryStatusImp = (repoName) => {
    const repoDir = getGitPath(repoName);
    
    return nodegit.Repository.open(repoDir)
    .then(repo => {
      return repo.getStatus();
    })
    .then(statuses => {
      var allStatus = {};

      statuses.forEach(file => {
        const statusWord = statusToText(file);
        if (allStatus[statusWord]) allStatus[statusWord].push(file.path());
        else allStatus[statusWord] = [file.path()];
      });

      return allStatus;
    });
};

export const getRepositoryTreeImp = (branch, repoName) => {
    const repoDir = getGitPath(repoName);
    let date;
    let sha;

  return nodegit.Repository.open(repoDir)
    .then(repo => {
      return repo.getBranchCommit(branch);
    })
    .then(commit => {
      date = commit.date();
      sha = commit.sha();
      return commit.getTree();
    })
    .then(tree => {
      return tree.entries().map(entry => ({
        key: entry.sha(),
        sha,
        date,
        isDirectory: entry.isDirectory(),
        isFile: entry.isFile(),
        name: entry.name(),
      }));
    });
};

export const commitImp = (branch, repoName, user, message) => {
    const repoDir = getGitPath(repoName);
    const { username, email } = user;

  return nodegit.Repository.open(repoDir)
    .then(repo => {
      return registerCommit({
        username,
        email,
        message,
      }, repo, branch);
    });
};

export const addBranchImp = (repoName, sourceBranch, branchName) => {
    let repository;
    const repoDir = getGitPath(repoName);
    
    return nodegit.Repository.open(repoDir)
    .then(repo => {
      repository = repo;
      return repo.getBranchCommit(sourceBranch);
    })
    .then(commit => {
      return repository.createBranch(branchName.replace(/ /g, '-'), commit, 0);
    });
};

export const getBranchListImp = repoName => {
    const repoDir = getGitPath(repoName);

  return nodegit.Repository.open(repoDir)
    .then(repo => {
      return repo.getReferenceNames(nodegit.Reference.TYPE.LISTALL);
    })
    .then(arrayReference => {
      // Use reference
      return arrayReference
        .map(reference => reference.toString().replace('refs/heads/', ''));
    });
};

export const deleteBranchImp = (repoName, branch) => {
    const repoDir = getGitPath(repoName);

  return nodegit.Repository.open(repoDir)
    .then(repo => {
      return repo.getBranch(branch);
    })
    .then(reference => {
      return nodegit.Branch.delete(reference);
    });
};

export const mergeToMasterImp = (repoName, branch, user) => {
    const repoDir = getGitPath(repoName);
    const { username, email } = user;

  return nodegit.Repository.open(repoDir)
    .then(repo => {
      const now = Date.now() / 1000;
      const signature = nodegit.Signature.create(username, email, now, 480);
      return repo.mergeBranches("master", branch, signature);
    });
};

export const getRepositoryHistorySummary = (repoId, repoName) => {
    const repoDir = getGitPath(repoName);
    let foundPLan;
    
    return PlanModel.findById(repoId)
    .then(plan => {
      foundPLan = plan;
      return nodegit.Repository.open(repoDir);
    })
    .then(repository => {
      return repository.getBranchCommit('master');
    })
    .then(firstCommit => {
      const history = firstCommit.history();
      let contributors = {};

      return new Promise(resolve => {
        history.on("commit", commit => {
          const name = commit.author().name();

          if (contributors[name]) contributors[name] += 1;
          else contributors[name] = 1;
        });

        history.on('end', commits => {
          resolve({
            totalContributions: commits.length,
            contributors,
            totalContributors: Object.keys(contributors).length,
            meta: foundPLan,
          });
        });

        history.start();
      });
    });
};

export const readFile = (repoName, filename) => {
  const repoDir = getGitPath(repoName);
  
  return nodegit.Repository.open(repoDir)
  .then(repo => {
    return repo.getHeadCommit();
  })
  .then(commit => {
    return commit.getEntry(filename);
  })
  .then(entry => {
    return entry.getBlob();
  })
  .then(blob => {
    return blob.toString().split("\n");
  });
};

const registerCommit = (inputs, repo, branch) => {
  const { username, email, message } = inputs;
  var index;
  var oid;

  return repo.refreshIndex()
    .then(indexResult => {
      index = indexResult;
      index.addAll(['.']);
      index.write();
      return index.writeTree();
    })
    .then(oidResult => {
      oid = oidResult;
      return repo.getBranchCommit(branch);
    })
    .then(parent => {
      const author = nodegit.Signature.now(username, email);
      const committer = nodegit.Signature.now(username, email);

      return repo.createCommit('HEAD', author, committer, message, oid, [parent]);
    });
};
