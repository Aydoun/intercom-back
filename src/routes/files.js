import express from 'express';
import multer from 'multer';
import { body } from 'express-validator';
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
const upload = multer({ dest: 'uploads/profiles', fileFilter });

files.post('/upload/image', upload.single('file'), processImageUpload);
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
