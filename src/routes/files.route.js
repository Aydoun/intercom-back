const files = require('express').Router();
const multer = require('multer');
const { fileFilter } = require('../controllers/files.controller');

const upload = multer({ dest: 'uploads/profiles', fileFilter });


files.post('/upload/image', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(401).json({
      error: 'Error Uploading The File',
    });
  }

  return res.send({
    success: req.file,
  });
});

module.exports = files;
