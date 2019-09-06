import * as I from './repository.service.imp';
  
export const createRepository = I.createRepositoryImp;
export const getRepositoryHistory = I.getRepositoryHistoryImp;
export const getRepositoryStatus = I.getRepositoryStatusImp;
export const getRepositoryTree = I.getRepositoryTreeImp;
export const commit = I.commitImp;
export const addBranch = I.addBranchImp;
export const getBranchList = I.getBranchListImp;
export const deleteBranch = I.deleteBranchImp;
export const mergeToMaster = I.mergeToMasterImp;
export const getRepositorySummary = I.getRepositoryHistorySummary;
    