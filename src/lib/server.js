import express from 'express';
import morgan  from'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import routes from'routes';
import auth from 'routes/auth';
import TokenCheck from 'middlewares/token';

const app = express();

// Body Parsing
app.use(bodyParser.urlencoded({ extended: 'true', limit: '50mb', parameterLimit: 10000 }));
app.use(bodyParser.json({ limit: '10mb' }));

// Express Middlewares
app.use(compression());
app.use(morgan('dev')); // log every request to the console
app.use('/uploads', express.static('uploads'));
app.use(auth);
app.use(TokenCheck);
app.use('/api', routes);

app.use(function (err, req, res) {
  res.status(500).formatResponse(err.message);
});

// Custom Response Wrapper
express.response.formatResponse = function(response, httpCode = 200) {
  const correctedHttpCode = typeof response !== 'undefined' ? httpCode : 401;
  return this.send({ 
    response, 
    httpCode: correctedHttpCode, 
    status: correctedHttpCode >= 200 && correctedHttpCode < 300 
  });
};

module.exports = app;
