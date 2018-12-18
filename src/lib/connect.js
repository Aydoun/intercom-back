const mongoose = require('mongoose');
const { Mockgoose } = require('mockgoose');
const config = require('../config');

const mockgoose = new Mockgoose(mongoose);

mongoose.Promise = Promise;

exports.connectToDb = (done) => {
  if (process.env.NODE_ENV === 'test') {
    mockgoose.prepareStorage().then(() => {
      mongoose.connect(config.db, { useNewUrlParser: true })
        .then(() => {
          done();
        })
        .catch(() => {
          console.log(`Error Connecting to The Database ${config.db}`);
        });
    });
  } else {
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
