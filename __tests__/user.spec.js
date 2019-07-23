const chai = require('chai')
  , chaiHttp = require('chai-http');
const faker = require('faker');
const config = require('../src/config');

chai.use(chaiHttp);

const baseUrl = `${config.host}:${config.port}/api`;

describe('User Endpoints', () => {
    let fakeUser = {
        name: faker.name.findName(),
        bio: faker.lorem.paragraph(),
    }; 

    it('should list user\'s Details', (done) => {
        chai.request(baseUrl)
        .get('/user')
        .set('x-api-key', config.testAccount.token)
        .end(function (err, res) {
            expect(err).toEqual(null);
            expect(res.body.httpCode).toEqual(200);
            expect(res.body.response).toBeTruthy();
            
            const { status, password, privacy } = res.body.response;

            expect(status).toEqual('Active');
            expect(password).toBeFalsy();
            expect(privacy).toBeFalsy();
            done();
        });
    });

    it('should list user\'s details by Id', (done) => {
        chai.request(baseUrl)
        .get(`/user/${config.testAccount._id}`)
        .set('x-api-key', config.testAccount.token)
        .end(function (err, res) {
            expect(err).toEqual(null);
            expect(res.body.httpCode).toEqual(200);
            expect(res.body.response).toBeTruthy();
            
            const { status, password, privacy, _id } = res.body.response;

            expect(_id).toEqual(config.testAccount._id);
            expect(status).toEqual('Active');
            expect(password).toBeFalsy();
            expect(privacy).toBeFalsy();
            done();
        });
    });

    it('should Update User\'s Data', (done) => {
        chai.request(baseUrl)
        .put('/user')
        .set('x-api-key', config.testAccount.token)
        .send(fakeUser)
        .end(function (err, res) {
            expect(err).toEqual(null);
            expect(res.body.status).toEqual(true);
            expect(res.body.response).toBeTruthy();
            expect(res.body.response).toMatchObject(fakeUser);

            done();
        });
    });

    it('should find users by names', (done) => {
        chai.request(baseUrl)
        .get(`/user/search`)
        .set('x-api-key', config.testAccount.token)
        .query({ name: fakeUser.name})
        .end(function (err, res) {
            // console.log(res.body, 22)
            expect(err).toEqual(null);
            expect(res.body.httpCode).toEqual(200);
            expect(res.body.response).toBeTruthy();
            expect(res.body.response.length).toBeGreaterThan(0);
            
            const responseUser = res.body.response[0];
            const { status, password, privacy, name } = responseUser;

            expect(name).toEqual(fakeUser.name);
            expect(status).toEqual('Active');
            expect(password).toBeFalsy();
            expect(privacy).toBeFalsy();
            done();
        });
    });

    it('should Delete User By Setting Status to Innactive', (done) => {
        chai.request(baseUrl)
        .delete('/user')
        .set('x-api-key', config.testAccount.token)
        .end(function (err, res) {
            expect(err).toEqual(null);
            expect(res.body.status).toEqual(true);
            expect(res.body.response).toEqual({});
            
            done();
        });
    });

    afterAll((done) => {
        chai.request(baseUrl)
        .put('/user')
        .set('x-api-key', config.testAccount.token)
        .send({ status: 'Active' })
        .end(function (err, res) {
            done();
        });
    });
});
