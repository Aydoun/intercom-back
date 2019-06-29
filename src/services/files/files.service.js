import {
  addFileImp, addDirectoryImp, removeFileImp, addContentImp, renameFileImp
} from './files.service.imp';

exports.addFile = addFileImp;
exports.addDirectory = addDirectoryImp;
exports.removeFile = removeFileImp;
exports.addContent = addContentImp;
exports.renameFile = renameFileImp;
