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

const files = express.Router();
const upload = multer({ dest: 'uploads/profiles', fileFilter });

files.post('/upload/image', upload.single('file'), processImageUpload);
files.post('/addFile', [
    body('repoName').isUUID(),
    body('fileName').not().isEmpty()
], addFile);
files.post('/addDir', [
    body('repoName').isUUID(),
    body('dirName').not().isEmpty()
], addDir);
files.put('/writeFile', [
    body('repoName').isUUID(),
    body('fileName').not().isEmpty(),
    body('content').not().isEmpty(),
], writeContent);
files.put('/renameFile', [
    body('repoName').isUUID(),
    body('oldName').not().isEmpty(),
    body('newName').not().isEmpty()
], changeFileName);
files.delete('/deleteFile', [
    body('repoName').isUUID(),
    body('fileName').not().isEmpty()
], deleteFile);

module.exports = files;
