const {
    createRepositoryImp,
  } = require('./git.service.imp');
  
  const createRepository = (creator, repoName, repoDescription) => {
    createRepositoryImp(creator, repoName, repoDescription);
  }
  
  module.exports = {
    createRepository,
  };
  