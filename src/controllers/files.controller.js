
const { updateUser } = require('../services/user/user.service');
const { addFile } = require('../services/files/files.service');
const config = require('../config');

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

  if ((fileName && repoName)) {
    addFile(repoName, fileName)
      .then(() => res.formatResponse({}))
      .catch(err => res.formatResponse(err.message, 401));
  }

  return res.formatResponse('Missing Data Fields', 401);
};
