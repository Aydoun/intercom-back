
exports.fileFilter = (req, file, cb) => {
  cb(null, file && file.mimetype.indexOf('image/') === 0);
};
