const fse = require('fs-extra');
const { gitFolder } = require('../../utils');

exports.addFileImp = (repoName, fileName) => {
  const pathToRepo = gitFolder(repoName);
  return fse.ensureFile(`${pathToRepo}/${fileName}`);
};
