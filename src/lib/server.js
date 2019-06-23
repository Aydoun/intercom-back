const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const config = require('config');
const routes = require('routes');
const { connectToDb } = require('./connect');
const { signToken } = require('./auth');
const { login, register } = require('controllers/user.controller');

const app = express();

// Body Parsing
app.use(bodyParser.urlencoded({ extended: 'true', limit: '50mb', parameterLimit: 10000 }));
app.use(bodyParser.json({ limit: '10mb' }));

// Token Requirement Exception for Authentication
app.post('/api/user/register', register);
app.post('/api/user/login', login);

// Express Middlewares
app.use(compression());
app.use(signToken);
app.use(morgan('dev')); // log every request to the console
app.use('/uploads', express.static('uploads'));
app.use('/api', routes);
app.use('*', (req, res) => res.formatResponse({ message: "End Point Doesn't Exist" }, 404));

// Database Connection
connectToDb();

app.use(function (err, req, res) {
  res.status(500).formatResponse(err.message)
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
