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
        .query({token: config.testAccount.token})
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

    it('should list some user\'s details by Id', (done) => {
        chai.request(baseUrl)
        .get(`/user/${config.testAccount._id}`)
        .query({token: config.testAccount.token})
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
        .query({ token: config.testAccount.token })
        .send(fakeUser)
        .end(function (err, res) {
            expect(err).toEqual(null);
            expect(res.body.status).toEqual(true);
            expect(res.body.response).toBeTruthy();
            expect(res.body.response).toMatchObject(fakeUser);

            done();
        });
    });

    it('should Delete User By Setting Status to Innactive', (done) => {
        chai.request(baseUrl)
        .delete('/user')
        .query({token: config.testAccount.token})
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
        .query({ token: config.testAccount.token })
        .send({ status: 'Active' })
        .end(function (err, res) {
            done();
        });
    });
})

