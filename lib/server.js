const express = require('express');
const mongoose = require('mongoose');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('../config');
const routes = require('../routes');

const app = express();


// app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());  
app.use('/api', routes);   
app.use('*', (req, res) => {
  return res.status(404).send({error : true , message:"End Point Doesn't Exist"});
});                                
mongoose.Promise = Promise;
mongoose.connect(config.db);


mongoose.connection.on('connected', function () {
  console.log(`Mongoose default connection open to ${config.db}`);
});

app.listen(config.port, function(err){
  if(err) throw err;
  console.log(`Server Listening on Port ${config.port}`);
});
