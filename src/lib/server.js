const express = require('express');
const morgan = require('morgan');
const multer = require('multer');

const bodyParser = require('body-parser');
const config = require('../config');
const routes = require('../routes');
const { connectToDb } = require('./connect');

const app = express();

function fileFilter(req, file, cb) {
  cb(null, file && file.mimetype.indexOf('image/') === 0);
}

const upload = multer({ dest: 'uploads/profiles', fileFilter });


app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ extended: 'true', limit: '50mb', parameterLimit: 10000 })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static('uploads'));
app.use('/api', routes);

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(401).json({
      error: 'Error Uploading The File',
    });
  }

  return res.send({
    success: req.file,
  });
});

app.use('*', (req, res) => res.status(404).send({ error: true, message: "End Point Doesn't Exist" }));

// connectToDb();

app.listen(config.port, (err) => {
  if (err) throw err;
  console.log(`Server Listening on Port ${config.port}`);
});
