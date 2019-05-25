
const { closeConnection, connectToDb } = require('../src/lib/connect');

const { registerUser, loginUser, changePassword, getUser, updateUser, deleteUser } = require('../src/services/user/user.service');
// beforeAll((done) => {
//   connectToDb(done);
// });

let _userId;

describe('User Authentication', () => {
  const name = 'testName';
  const email = 'testemail@testprovider.nl';
  const password = 'testpassword';
  it('Should Pass', () => {
    expect(1+1).toBe(2);
  });
  // it('Should register user using an email and a password', (done) => {
  //   registerUser(name, email, password)
  //     .then((user) => {
  //       expect(user).toHaveProperty('_id');
  //       expect(user).toHaveProperty('email');
  //       expect(user).not.toHaveProperty('password');

  //       expect(user.email).toBe(email);
  //       expect(user.name).toBe(name);
  //       expect(user.password).not.toBe(password);
  //       _userId = user._id;
  //       done();
  //     })
  //     .catch((err) => {
  //       done(err);
  //     });
  // });

  // it('Should not register user with the same email', async () => {
  //   expect.assertions(1);
  //   try {
  //     await registerUser(name, email, password);
  //   } catch (e) {
  //     expect(e).toBeTruthy();
  //   }
  // });

  // it('Should Login user using an email and a password', (done) => {
  //   loginUser(email, password)
  //     .then((user) => {
  //       expect(user).toHaveProperty('_id');
  //       expect(user).toHaveProperty('email');
  //       expect(user).not.toHaveProperty('password');
  //       done();
  //     })
  //     .catch((err) => {
  //       done(err);
  //     });
  // });

  // it('Should Throw an Error with incorrect Login Information', async () => {
  //   const fakePassword = 'fakepassword';
  //   expect.assertions(1);
  //   try {
  //     await loginUser(email, fakePassword);
  //   } catch (e) {
  //     expect(e).toBeTruthy();
  //   }
  // });

  // it('Should let the user change the old password', (done) => {
  //   const newPassword = 'newPassword';

  //   changePassword(_userId, password, newPassword)
  //     .then((response) => {
  //       expect(response).not.toBeNull();
  //       done();
  //     })
  //     .catch((err) => {
  //       done(err);
  //     });
  // });

  // it('Should not let user use previous password', async () => {
  //   expect.assertions(1);
  //   try {
  //     await loginUser(email, password);
  //   } catch (e) {
  //     expect(e).toBeTruthy();
  //   }
  // });
});

describe('User Crud', () => {
  // it('Should get User By Id', (done) => {
  //   getUser(_userId)
  //     .then((user) => {
  //       expect(user).not.toBeNull();
  //       expect(user).toHaveProperty('email');
  //       expect(user).not.toHaveProperty('password');
  //       done();
  //     })
  //     .catch((err) => {
  //       done(err);
  //     });
  // });

  // it('Should Update User Information By Id', (done) => {
  //   const newName = 'newName';
  //   updateUser(_userId, { name: newName })
  //     .then((res) => {
  //       expect(res).not.toBeNull();
  //       expect(res.ok).toBe(1);
  //       done();
  //     })
  //     .catch((err) => {
  //       done(err);
  //     });
  // });

  // it('Should Desactivate User By Id', (done) => {
  //   deleteUser(_userId)
  //     .then((res) => {
  //       expect(res).not.toBeNull();
  //       expect(res.ok).toBe(1);
  //       done();
  //     })
  //     .catch((err) => {
  //       done(err);
  //     });
  // });
});

// afterAll(() => {
//   closeConnection();
// });
