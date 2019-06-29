import mongoose from 'mongoose';
import config from 'config';

mongoose.Promise = Promise;

exports.connectToDb = () => {
  if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(config.db, { useNewUrlParser: true })
      .then(() => {
        console.log(`Mongoose default connection open to ${config.db}`);
      })
      .catch(() => {
        console.log(`Error Connecting to The Database ${config.db}`);
      });
  } 
};

exports.closeConnection = () => {
  if (mongoose) {
    mongoose.connection.close();
    mongoose.models = {};
    mongoose.modelSchemas = {};
  }
};
