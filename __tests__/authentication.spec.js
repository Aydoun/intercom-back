const chai = require('chai'),
  chaiHttp = require('chai-http');
const faker = require('faker');
const { baseUrl } = require('../src/config');
import testUser from './fixtures/user.json';
chai.use(chaiHttp);

describe('Authentication Suite', () => {
  describe('Registration Suite', () => {
    const fakeUser = {
      name: faker.internet.userName(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password()
    };

    it('Should Reject incorrect email', done => {
      chai
        .request(baseUrl)
        .post('/user/register')
        .send({ email: 'not an email', name: 'name', password: '00000000' })
        .end(function(err, res) {
          expect(err).toBeFalsy();
          const { status } = res.body;
          expect(status).toEqual(false);

          done();
        });
    });

    it('Should Reject Passwords less than 8 characters', done => {
      chai
        .request(baseUrl)
        .post('/user/register')
        .send({ email: 'email@gmail.com', name: 'name', password: '000000' })
        .end(function(err, res) {
          const { status } = res.body;
          expect(status).toEqual(false);

          done();
        });
    });

    it('Should Reject request with empty name', done => {
      chai
        .request(baseUrl)
        .post('/user/register')
        .send({ email: 'email@gmail.com', name: '', password: '00000000' })
        .end(function(err, res) {
          expect(err).toBeFalsy();
          const { status } = res.body;
          expect(status).toEqual(false);

          done();
        });
    });

    it('Should Reject registering similar email addresses', done => {
      chai
        .request(baseUrl)
        .post('/user/register')
        .send(testUser)
        .end(function(err, res) {
          expect(err).toBeFalsy();
          const { status } = res.body;
          expect(status).toEqual(false);

          done();
        });
    });

    it('should Register new user', done => {
      chai
        .request(baseUrl)
        .post('/user/register')
        .send(fakeUser)
        .end((err, res) => {
          const {
            httpCode,
            status,
            response: { token, name, email }
          } = res.body;
          expect(status).toEqual(true);
          expect(httpCode).toEqual(200);
          expect(name).toEqual(fakeUser.name);
          expect(email).toEqual(fakeUser.email);

          done();
        });
    });
  });

  describe('Login Suite', () => {
    it('Should Reject incorrect email', done => {
      chai
        .request(baseUrl)
        .post('/user/login')
        .send({ email: 'not an email', password: '00000000' })
        .then(data => {
          const { httpCode, status } = data.body;

          expect(status).toEqual(false);
          expect(httpCode).not.toEqual(200);
          done();
        });
    });

    it('Should Reject Incorrect Password', done => {
      chai
        .request(baseUrl)
        .post('/user/login')
        .send({ email: testUser.email, password: '000000' })
        .then(data => {
          const { httpCode, status } = data.body;

          expect(status).toEqual(false);
          expect(httpCode).not.toEqual(200);
          done();
        });
    });

    it('Should let a user login', done => {
      chai
        .request(baseUrl)
        .post('/user/login')
        .send(testUser)
        .end((err, res) => {
          const {
            status,
            httpCode,
            response: { token }
          } = res.body;

          expect(status).toEqual(true);
          expect(httpCode).toEqual(200);
          expect(token).not.toBeUndefined();
          done();
        });
    });
  });
});
