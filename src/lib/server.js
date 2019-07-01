import express from 'express';
import morgan  from'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import config from 'config';
import routes from'routes';
import { connectToDb } from'./connect';
import auth from './auth';

const app = express();

// Body Parsing
app.use(bodyParser.urlencoded({ extended: 'true', limit: '50mb', parameterLimit: 10000 }));
app.use(bodyParser.json({ limit: '10mb' }));

// Express Middlewares
app.use(compression());
app.use(morgan('dev')); // log every request to the console
app.use('/uploads', express.static('uploads'));
app.use(auth);
app.use('/api', routes);
app.use('*', (req, res) => res.formatResponse({ message: "End Point Doesn't Exist" }, 404));

// Database Connection
connectToDb();

app.use(function (err, req, res) {
  res.status(500).formatResponse(err.message);
});

// Custom Response Wrapper
express.response.formatResponse = function(response, httpCode = 200) {
  return this.send({ response, httpCode, status: httpCode === 200 });
};

// Port Listening to modify in the Future
app.listen(config.port, (err) => {
  if (err) throw err;
  console.log(`Server Listening on Port ${config.port}`);
});
