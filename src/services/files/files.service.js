const { addFileImp } = require('./files.service.imp');

exports.addFileService = (repoName, fileName) => addFileImp(repoName, fileName);
