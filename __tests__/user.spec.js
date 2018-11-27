const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const mongoose = require('mongoose');
require('sinon-mongoose');

//Importing our todo model for our unit testing.
const User = require('../models/user.model');

describe("Get all todos", function(){
    // Test will pass if we get all todos
   it("should return all todos", function(done){
       var UserMock = sinon.mock(User);
       var expectedResult = {status: true, users: []};
       UserMock.expects('find').yields(null, expectedResult);
       User.find(function (err, result) {
           UserMock.verify();
           UserMock.restore();
           expect(result.status).to.be.true;
           done();
       });
   });

   it("should return an error", function(done){
    var UserMock = sinon.mock(User);
    var expectedResult = {status: false, users: []};
    UserMock.expects('find').yields(expectedResult, null);
    User.find(function (err, result) {
        UserMock.verify();
        UserMock.restore();
        expect(err.status).to.not.be.true;
        done();
    });
});
});
