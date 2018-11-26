const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();


app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json

mongoose.connect(config.db);

//This callback will be triggered once the connection is successfully established to MongoDB
mongoose.connection.on('connected', function () {
  console.log(`Mongoose default connection open to ${config.db}`);
});

//Express application will listen to port mentioned in our configuration
app.listen(config.port, function(err){
  if(err) throw err;
  console.log(`App listening on port ${config.port}`);
});
