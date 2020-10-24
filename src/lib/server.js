import express from 'express';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import routes from 'routes';
import auth from 'routes/auth';
import TokenCheck from 'middlewares/token';
import swaggerDocument from '../../swagger.json';

const app = express();

// Body Parsing
app.use(
  bodyParser.urlencoded({
    extended: 'true',
    limit: '50mb',
    parameterLimit: 10000
  })
);
app.use(bodyParser.json({ limit: '10mb' }));

// Express Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev')); // log every request to the console
app.use('/uploads', express.static('uploads'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(auth);
app.use(TokenCheck);

app.use('/api', routes);

app.use(function(err, req, res) {
  res(err.message);
});

// Custom Response Wrapper
express.response.formatResponse = function(response, httpCode = 200, value) {
  const correctedHttpCode = typeof response !== 'undefined' ? httpCode : 401;

  console.log('response :>> ', Boolean(response));
  return this.send({
    response: response || {},
    httpCode: correctedHttpCode,
    status: correctedHttpCode >= 200 && correctedHttpCode < 300,
    value: value || 0
  });
};

module.exports = app;
