import express from 'express';
import multer from 'multer';
import uuidv1 from 'uuid/v1';
import { body, query } from 'express-validator';
import {
    fileFilter,
    processImageUpload,
    addFile,
    addDir,
    writeContent,
    deleteFile,
    changeFileName,
} from 'controllers/files.controller';
import { catchValidationError } from 'utils/validation';

const files = express.Router();
const storage = multer.diskStorage({
    destination: 'uploads/pics',
    filename: (req, file, cb) => cb(null, `${uuidv1()}.png`)
});

const upload = multer({ storage, fileFilter });

files.post('/upload/image', query('type').exists(), catchValidationError, upload.single('file'), processImageUpload);
files.post('/addFile', [
    body('repoName').isUUID(),
    body('fileName').not().isEmpty()
], catchValidationError, addFile);
files.post('/addDir', [
    body('repoName').isUUID(),
    body('dirName').not().isEmpty()
], catchValidationError, addDir);
files.put('/writeFile', [
    body('repoName').isUUID(),
    body('fileName').not().isEmpty(),
    body('content').not().isEmpty(),
], catchValidationError, writeContent);
files.put('/renameFile', [
    body('repoName').isUUID(),
    body('oldName').not().isEmpty(),
    body('newName').not().isEmpty()
], catchValidationError, changeFileName);
files.delete('/deleteFile', [
    body('repoName').isUUID(),
    body('fileName').not().isEmpty()
], catchValidationError, deleteFile);

module.exports = files;
