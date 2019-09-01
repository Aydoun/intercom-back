import mongoose from 'mongoose';
import config from 'config';

mongoose.Promise = Promise;

exports.connectToDb = (cb) => {  
  return mongoose.connect(config.db, { useNewUrlParser: true, useCreateIndex: true, })
  .then(() => {
    if (typeof cb === 'function') cb();
  });
};
