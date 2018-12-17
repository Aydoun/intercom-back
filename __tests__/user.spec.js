
const { closeConnection, connectToDb } = require('../lib/connect');
const expect = require('expect');

//Importing The Controller
const { registerUserImp, loginUserImp, getUserImp } = require('../services/user/user.service.imp');

before(function (done) {
    connectToDb(done);
});

let _userId;

describe("User Authentication", function () {
    it("Should register user using an email and a password", (done) => {
        const name = 'testName';
        const email = 'testemail';
        const password = 'testpassword';

        registerUserImp(name, email, password)
            .then(user => {
                expect(user).toHaveProperty('_id');
                expect(user).toHaveProperty('email');
                expect(user).not.toHaveProperty('password');

                expect(user.email).toBe(email);
                expect(user.name).toBe(name);
                expect(user.password).not.toBe(password);
                _userId = user._id;
                done();
            })
            .catch(err => {
                done(err);
            });
    });


    it("Should Login user using an email and a password", (done) => {
        const email = 'testemail';
        const password = 'testpassword';

        loginUserImp(email, password)
            .then(user => {
                expect(user).toHaveProperty('_id');
                expect(user).toHaveProperty('email');
                expect(user).not.toHaveProperty('password');
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    it("Should Throw an Error with incorrect Login Information", (done) => {
        const email = 'testemail';
        const password = 'fakepassword';

        loginUserImp(email, password)
            .then(user => {
                throw new Error('User should not exist!');
            })
            .catch(err => {
                done();
            });
    });
});

 describe("User Crud", function(){
    it("Should get User By Id", (done) => {
        getUserImp(_userId)
        .then(user => {
            expect(user).not.toBeNull();
            expect(user).toHaveProperty('email');
            expect(user).not.toHaveProperty('password');
            done();
        })
        .catch(err => {
            done(err);
        });
    });
 });

after(() => {
    closeConnection();
});
