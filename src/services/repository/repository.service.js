import {
  createRepositoryImp, 
  getRepositoryHistoryImp,
} from './repository.service.imp';
  
const createRepository = createRepositoryImp;
const getRepositoryHistory = getRepositoryHistoryImp;
  
module.exports = {
  createRepository,
  getRepositoryHistory,
};
  