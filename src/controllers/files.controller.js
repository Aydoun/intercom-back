
import sharp from 'sharp';
import systemPath from 'path';
import fs from 'fs';
import { updateUser } from 'services/user/user.service';
import { updatePlan } from 'services/plan/plan.service';
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
  const { query: { type, id: elementId }, file: { path }, tokenData: { id } } = req;
  const url = `${config.host}:${config.port}/${path}`;
  const absolutePath = systemPath.join(process.cwd(), path);

  sharp(absolutePath).resize(200).png().toBuffer()
  .then(data => fs.writeFile(absolutePath, data, () => {}));

  if (type === 'user') {
    return updateUser(id, { avatar: url })
    .then(() => res.formatResponse({
      url,
    }))
    .catch(err => res.formatResponse({
      message: err.message,
    }), 401); 
  } 
  else if (type === 'plan' && elementId) {
    return updatePlan(elementId, { avatar: url })
    .then(() => res.formatResponse({
      url,
    }))
    .catch(err => res.formatResponse({
      message: err.message,
    }), 401); 
  } else {
    throw new Error('Invalid parameters');
  }
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
