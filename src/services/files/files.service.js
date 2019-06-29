const {
  addFileImp, addDirectoryImp, removeFileImp, addContentImp, renameFileImp
} = require('./files.service.imp');

exports.addFile = addFileImp;
exports.addDirectory = addDirectoryImp;
exports.removeFile = removeFileImp;
exports.addContent = addContentImp;
exports.renameFile = renameFileImp;
