import fs from 'fs';
import path from 'path';
import fse from 'fs-extra';
import util from 'util';
import { getGitPath } from 'utils';

const readFile = util.promisify(fs.readFile);

export const addFileImp = (repoName, fileName) => {
  const writingPath = path.join(getGitPath(repoName), fileName);
  fse.ensureFileSync(writingPath);

  return writingPath;
};

export const addDirectoryImp = (repoName, directoryName) => {
  const writingPath = path.join(getGitPath(repoName), directoryName);
  fse.ensureDirSync(writingPath);

  return writingPath;
};

export const removeFileImp = (repoName, fileName) => {
  const writingPath = path.join(getGitPath(repoName), fileName);
  fse.removeSync(writingPath);

  return writingPath;
};

export const addContentImp = (repoName, fileName, content) => {
  const writingPath = path.join(getGitPath(repoName), fileName);

  fse.outputFileSync(writingPath, content);
  return writingPath;
};

export const renameFileImp = (repoName, oldName, newName) => {
  const repoPath = path.resolve(getGitPath(repoName));

  fs.renameSync(`${repoPath}/${oldName}`, `${repoPath}/${newName}`);
  return `${repoPath}/${newName}`;
};

export const readContent = (repoName, filePath) => {
  const readingPath = path.join(getGitPath(repoName), filePath);

  return readFile(readingPath);
};
