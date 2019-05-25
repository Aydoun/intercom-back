const files = require('express').Router();
const multer = require('multer');
const { fileFilter, processImageUpload, addFile } = require('../controllers/files.controller');

const upload = multer({ dest: 'uploads/profiles', fileFilter });

files.post('/upload/image', upload.single('file'), processImageUpload);
files.post('/addFile', addFile);
// files.post('/addDir', (req, res, next) => {});
// files.put('/writeFile', (req, res, next) => {});
// files.put('/renameFile', (req, res, next) => {});
// files.put('/renameDir', (req, res, next) => {});
// files.delete('/deleteFile', (req, res, next) => {});
// files.delete('/deleteDir', (req, res, next) => {});

module.exports = files;
