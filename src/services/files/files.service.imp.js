const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');
const { getGitPath } = require('../../utils');

exports.addFileImp = (repoName, fileName) => {
  const writingPath = path.join(getGitPath(repoName), fileName);
  fse.ensureFileSync(writingPath);

  return writingPath;
};

exports.addDirectoryImp = (repoName, directoryName) => {
  const writingPath = path.join(getGitPath(repoName), directoryName);
  fse.ensureDirSync(writingPath);

  return writingPath;
};

exports.removeFileImp = (repoName, fileName) => {
  const writingPath = path.join(getGitPath(repoName), fileName);
  fse.removeSync(writingPath);

  return writingPath;
};

exports.addContentImp = (repoName, fileName, content) => {
  const writingPath = path.join(getGitPath(repoName), fileName);

  fs.writeFileSync(writingPath, content);
  return writingPath;
};
