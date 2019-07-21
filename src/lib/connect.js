import mongoose from 'mongoose';
import config from 'config';

mongoose.Promise = Promise;

exports.connectToDb = (cb) => {
  const dbName = process.env.NODE_ENV === 'test' ? config.testdb : config.devdb;
  
  return mongoose.connect(dbName, { useNewUrlParser: true, useCreateIndex: true, })
  .then(() => cb());
};
