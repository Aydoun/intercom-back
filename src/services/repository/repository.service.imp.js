import nodegit from 'nodegit';
import path from 'path';
import fse from 'fs-extra';
import { getGitPath, statusToText } from 'utils';

exports.createRepositoryImp = (creator, repoName, repoDescription, initialMessage) => {
    const fileName = "README.md";
    const fileContent = repoDescription;
    const repoDir = getGitPath(repoName);
    const { username, email } = creator;

    let repository;

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
        idx.addByPath(fileName);
        idx.write();
        return idx.writeTree();
    })
    .then(oid => {
        const author = nodegit.Signature.now(username, email);
        const committer = nodegit.Signature.now(username, email);

        return repository.createCommit("HEAD", author, committer, initialMessage, oid, []);
    });
};

exports.getRepositoryHistoryImp = (branch, repoName) => {
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
                        sha : commit.sha(),
                        author : commit.author().name(),
                        email: commit.author().email(),
                        date : commit.date(),
                        comment : commit.message()
                    };
                });
                resolve(logs);
            });

            history.start();
        });      
    });
};

exports.getRepositoryStatusImp = (repoName) => {
    const repoDir = getGitPath(repoName);
    
    return nodegit.Repository.open(repoDir)
    .then(repo => {
        return repo.getStatus();
    })    
    .then(statuses => {
        var allStatus = {};
        
        statuses.forEach(file => {
            const statusWord = statusToText(file);
            if (allStatus.statusWord) allStatus[statusWord].push(file.path()); 
            else allStatus[statusWord] = [file.path()];
        });

        return allStatus;
    });
};

exports.getRepositoryTreeImp = (branch, repoName) => {
    const repoDir = getGitPath(repoName);
    let date;
    let sha;

    return nodegit.Repository.open(repoDir)
    .then(repo => {
      return repo.getBranchCommit(branch);
    })
    .then(firstCommit => {
      date = firstCommit.date();
      sha = firstCommit.sha();
      return firstCommit.getTree();
    })
    .then(tree => {
        return tree.entries().map(entry => ({
            key : entry.sha(),
            sha,
            date,
            isDirectory : entry.isDirectory(),
            isFile : entry.isFile(),
            name : entry.name(), 
        }));
    });
};

exports.commitImp = (branch, repoName, user, message) => {
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

const registerCommit = (inputs , repo, branch) => {
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
