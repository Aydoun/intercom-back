
// import nodegit from 'nodegit';
// import { getGitPath } from 'utils';
// import * as I from 'services/repository/repository.service.imp';
import * as F from 'services/files/files.service';

export const exp = (req, res) => {
  const { repoName } = req.query;

  F.readContent(repoName, 'README.md')
  .then(content => res.formatResponse(content.toString()));
  // return I.commitImp('develop', repoName, { username: 'gaga', email: 'gaga@gmail.com' }, 'houssyy')
  // .then(commit => {
  //   res.formatResponse(commit.toString());
  // })
  // .catch(err => {
  //   res.formatResponse(err.message, 401);
  // });

  // const repoDir = getGitPath(repoName);
  
  // return nodegit.Repository.open(repoDir)
  // .then(repo => {
  //   return repo.getReferenceNames(3);
  // })
  // .then(data => {
  //   res.formatResponse(data);
  // });
  // // .then(commit => {
  // //   return commit.sha();
  // // })
  // .then(response => {
  //   console.log(response, 'response');
    
  // });
};
