
import { updateUser } from 'services/user/user.service';
import { addFile, addDirectory, addContent, removeFile, renameFile } from 'services/files/files.service';
import config from 'config';

exports.fileFilter = (req, file, cb) => {
  cb(null, file && file.mimetype.indexOf('image/') === 0);
};

exports.processImageUpload = (req, res) => {
  if (!req.file) {
    return res.formatResponse({
      error: 'Error Uploading The File',
    }, 401);
  }
  const { path } = req.file;
  const { id } = req.tokenData;
  const url = `${config.host}:${config.port}/${path}`;

  return updateUser(id, { avatar: url })
    .then(() => res.formatResponse({
      url,
    }))
    .catch(err => res.formatResponse({
      message: err.message,
    }), 401);
};

exports.addFile = (req, res) => {
  const { repoName, fileName } = req.body;

  try {
    addFile(repoName, fileName);
    res.formatResponse({});
  } catch(err) {
    res.formatResponse(err.message, 401);
  }
};

exports.addDir = (req, res) => {
  const { repoName, dirName } = req.body;

  try {
    addDirectory(repoName, dirName);
    res.formatResponse({ });
  } catch(err) {
    res.formatResponse(err.message, 401);
  }
};

exports.writeContent = (req, res) => {
  const { repoName, fileName, content } = req.body;

  try {
    addContent(repoName, fileName, content);
    res.formatResponse({ });
  } catch(err) {
    res.formatResponse(err.message, 401);
  }
};

exports.changeFileName = (req, res) => {
  const { repoName, oldName, newName } = req.body;

  try {
    renameFile(repoName, oldName, newName);
    res.formatResponse({ });
  } catch(err) {
    res.formatResponse(err.message, 401);
  }
};

exports.deleteFile = (req, res) => {
  const { repoName, fileName } = req.body;

  try {
    removeFile(repoName, fileName);
    res.formatResponse({ });
  } catch(err) {
    res.formatResponse(err.message, 401);
  }
};
