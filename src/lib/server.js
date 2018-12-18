const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('../config');
const routes = require('../routes');
const { connectToDb } = require('./connect');

const app = express();

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ extended: 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use('/api', routes);
app.use('*', (req, res) => res.status(404).send({ error: true, message: "End Point Doesn't Exist" }));

connectToDb();

app.listen(config.port, (err) => {
  if (err) throw err;
  console.log(`Server Listening on Port ${config.port}`);
});
