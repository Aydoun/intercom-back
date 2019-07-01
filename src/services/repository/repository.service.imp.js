import nodegit from 'nodegit';
import path from 'path';
import fse from 'fs-extra';
import { getGitPath } from 'utils';

exports.createRepositoryImp = (creator, repoName, repoDescription, initialMessage) => {
    const fileName = "README.md";
    const fileContent = repoDescription;
    const repoDir = getGitPath(repoName);
    const { username, email } = creator;

    let repository;
    let index;

    return fse.ensureDir(path.resolve(__dirname, repoDir))
    .then(function() {
        return nodegit.Repository.init(path.resolve(__dirname, repoDir), 0);
    })
    .then(function(repo) {
        repository = repo;
        return fse.writeFile(path.join(repository.workdir(), fileName), fileContent);
    })
    .then(function(){
        return repository.refreshIndex();
    })
    .then(function(idx) {
        index = idx;
    })
    .then(function() {
        return index.addByPath(fileName);
    })
    .then(function() {
        return index.write();
    })
    .then(function() {
        return index.writeTree();
    })
    .then(function(oid) {
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
            history.on('end', function(commits) {
                const logs = commits.map(function(commit) {
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
}
