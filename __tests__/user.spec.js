
const { closeConnection, connectToDb } = require('../lib/connect');
const expect = require('expect');

//Importing The Controller
const {
    registerUserImp,
    loginUserImp,
    getUserImp,
    updateUserImp,
    deleteUser,
} = require('../services/user/user.service.imp');

before(function (done) {
    connectToDb(done);
});

let _userId;

describe("User Authentication", function () {
    const name = 'testName';
    const email = 'testemail@testprovider.nl';
    const password = 'testpassword';

    it("Should register user using an email and a password", (done) => {
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

    it("Should not register user with the same email", async () => {
        expect.assertions(1);
        try {
            await registerUserImp(name, email, password);
          } catch (e) {
            expect(e).toBeTruthy();
          }
    });

    it("Should Login user using an email and a password", (done) => {
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

    it("Should Throw an Error with incorrect Login Information", async () => {
        const fakePassword = 'fakepassword';
        expect.assertions(1);
        try {
            await loginUserImp(email, fakePassword);
          } catch (e) {
            expect(e).toBeTruthy();
          }
    });
});

describe("User Crud", function () {
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

    it("Should Update User Information By Id", (done) => {
        const newName = 'newName';
        updateUserImp(_userId, { name: newName })
            .then(res => {
                expect(res).not.toBeNull();
                expect(res.ok).toBe(1);
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    it("Should Desactivate User By Id", (done) => {
        deleteUser(_userId)
            .then(res => {
                expect(res).not.toBeNull();
                expect(res.ok).toBe(1);
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
