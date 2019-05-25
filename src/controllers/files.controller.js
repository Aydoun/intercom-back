
const { updateUser } = require('../services/user/user.service');
const { addFileService } = require('../services/files/files.service');
const config = require('../config');

exports.fileFilter = (req, file, cb) => {
  cb(null, file && file.mimetype.indexOf('image/') === 0);
};

exports.processImageUpload = (req, res) => {
  if (!req.file) {
    return res.status(401).json({
      error: 'Error Uploading The File',
    });
  }
  const { path } = req.file;
  const { id } = req.tokenData;
  const url = `${config.host}:${config.port}/${path}`;

  return updateUser(id, { avatar: url })
    .then(() => res.status(200).send({
      success: true,
      url,
    }))
    .catch(err => res.status(401).send({
      success: false,
      message: err.message,
    }));
};

exports.addFile = (req, res) => {
  const { repoName, fileName } = req.body;
  console.log(req.body, (fileName && repoName), 'body');

  if ((fileName && repoName)) {
    console.log('Yoo');
    addFileService(repoName, fileName)
      .then(() => res.status(200).send({}))
      .catch(err => res.status(401).send(err.message));
  }

  return res.status(401).send('Missing Data Fields');
};
