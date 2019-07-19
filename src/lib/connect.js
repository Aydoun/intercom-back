import mongoose from 'mongoose';
import config from 'config';

mongoose.Promise = Promise;

exports.connectToDb = () => {
  const dbName = process.env.NODE_ENV === 'test' ? config.testdb : config.devdb;
  
  mongoose.connect(dbName, { useNewUrlParser: true })
    .then(() => {
      console.log(`Mongoose connected, env = ${process.env.NODE_ENV}`);
    })
    .catch(() => {
      console.log(`Error Connecting to The Database, env = ${process.env.NODE_ENV}`);
    }); 
};
