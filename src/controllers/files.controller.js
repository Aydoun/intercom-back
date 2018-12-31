
const { updateUser } = require('../services/user/user.service');
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
  const url = `${config.host}:${config.port}/${path}`;

  return updateUser('5bfd56bfff3ab4434971ba02', { avatar: url })
    .then(() => res.status(200).send({
      success: true,
      url,
    }))
    .catch(err => res.status(401).send({
      success: false,
      message: err.message,
    }));
};
