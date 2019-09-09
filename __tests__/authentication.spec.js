const chai = require('chai')
  , chaiHttp = require('chai-http');
const faker = require('faker');
const config = require('../src/config');
chai.use(chaiHttp);

const baseUrl = `${config.host}:${config.port}/api`;

describe('User Registration', () => {
  let fakeUser = {
    name: faker.internet.userName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
  };

  let userToken;

  it('Should Reject incorrect email', (done) => {
    chai.request(baseUrl)
      .post('/user/register')
      .send({ email: 'not an email', name: 'name', password: '00000000' })
      .end(function (err, res) {
        const { status } = res.body;
        expect(status).toEqual(false);

        done();
      });
  });

  it('Should Reject Passwords less than 8 characters', (done) => {
    chai.request(baseUrl)
      .post('/user/register')
      .send({ email: 'email@gmail.com', name: 'name', password: '000000' })
      .end(function (err, res) {
        const { status } = res.body;
        expect(status).toEqual(false);

        done();
      });
  });

  it('Should Reject request with empty name', (done) => {
    chai.request(baseUrl)
      .post('/user/register')
      .send({ email: 'email@gmail.com', name: '', password: '00000000' })
      .end(function (err, res) {
        const { status } = res.body;
        expect(status).toEqual(false);

        done();
      });
  });

  it('should Register user', (done) => {
    chai.request(baseUrl)
      .post('/user/register')
      .send(fakeUser)
      .end(function (err, res) {
        const { httpCode, status, response: { token, name, email } } = res.body;
        expect(status).toEqual(true);
        expect(httpCode).toEqual(200);
        expect(name).toEqual(fakeUser.name);
        expect(email).toEqual(fakeUser.email);

        userToken = token;
        done();
      });
  });

  it('Should list initial Plans as Empty List', (done) => {
    chai.request(baseUrl)
      .get('/user/plans')
      .set('x-api-key', userToken)
      .end(function (err, res) {
        const { httpCode, status, response: { docs } } = res.body;

        expect(status).toEqual(true);
        expect(httpCode).toEqual(200);
        expect(docs.length).toBe(0);
        done();
      });
  });

  it('Should Show Activity List with one item --> Registration activity', (done) => {
    chai.request(baseUrl)
      .get('/user/activity')
      .set('x-api-key', userToken)
      .end(function (err, res) {
        const { httpCode, status, response } = res.body;

        expect(status).toEqual(true);
        expect(httpCode).toEqual(200);
        expect(response.length).toBe(1);
        done();
      });
  });
});

describe('User Login', () => {
  const { email, password } = config.testAccount;
  const testUser = { email, password };

  let userToken;

  it('Should Reject incorrect email', (done) => {
    chai.request(baseUrl)
      .post('/user/login')
      .send({ email: 'not an email', password: '00000000' })
      .then(data => {
        const { httpCode, status } = data.body;

        expect(status).toEqual(false);
        expect(httpCode).not.toEqual(200);
        done();
      });
  });

  it('Should Reject Incorrect Password', (done) => {
    chai.request(baseUrl)
      .post('/user/login')
      .send({ email, password: '000000' })
      .then(data => {
        const { httpCode, status } = data.body;

        expect(status).toEqual(false);
        expect(httpCode).not.toEqual(200);
        done();
      });
  });

  it('Should to Able a user to login', (done) => {
    chai.request(baseUrl)
      .post('/user/login')
      .send(testUser)
      .end(function (err, res) {
        const { status, httpCode, response: { token } } = res.body;

        expect(status).toEqual(true);
        expect(httpCode).toEqual(200);
        expect(token).not.toBeUndefined();
        done();
      });
  });
});
