const files = require('express').Router();
const multer = require('multer');
const { fileFilter, processImageUpload } = require('../controllers/files.controller');

const upload = multer({ dest: 'uploads/profiles', fileFilter });

files.post('/upload/image', upload.single('file'), processImageUpload);

module.exports = files;
