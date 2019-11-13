
import nodegit from 'nodegit';
import { getGitPath } from 'utils';

export const exp = (req, res) => {
  const { repoName, sha } = req.query;

  const repoDir = getGitPath(repoName);
  
  return nodegit.Repository.open(repoDir)
  .then(repo => {
    return repo.getTree(sha);
  })
  .then(tree => {
    return tree.entries().map(entry => ({
      entrysha: entry.sha(),
      id: entry.oid(),
      commitsha: sha,
      isDirectory: entry.isDirectory(),
      isFile: entry.isFile(),
      name: entry.name(),
    }));
  })
  .then(rr => {
    res.formatResponse(rr);
  });
};
