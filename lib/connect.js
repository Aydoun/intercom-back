const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const config = require('../config');

const mockgoose = new Mockgoose(mongoose);

mongoose.Promise = Promise;

exports.connectToDb  = (done) => {
    if(process.env.NODE_ENV === 'test') {
        mockgoose.prepareStorage().then(function() {
        	mongoose.connect(config.db, function(err) {
                console.log('Connected To Test DB');
                done();
            });
            mongoose.connection.on('error', function () {
                console.log(`ERRORROOR ${config.db}`);
            });
        });
    } else {
        mongoose.connect(config.db);
        mongoose.connection.on('connected', function () {
            console.log(`Mongoose default connection open to ${config.db}`);
        });
        mongoose.connection.on('error', function () {
            console.log(`ERRORROOR ${config.db}`);
        });
    }
}

exports.closeConnection = () => {
    if (mongoose) {
        mongoose.connection.close();
    }
}
