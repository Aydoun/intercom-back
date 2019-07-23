const chai = require('chai')
  , chaiHttp = require('chai-http');
const config = require('../src/config');

chai.use(chaiHttp);

const baseUrl = `${config.host}:${config.port}/api`;
const resourceNotFound = `${config.host}:${config.port}/api/notFound`;

describe('API Root', () => {
    it('Should return error when token is not provided', (done) => {
        chai.request(baseUrl)
        .get('/')
        .end(function (err, res) {
            expect(err).toEqual(null);
            expect(res.body.httpCode).toEqual(403);
            expect(res.body.response).toBeTruthy();
            
            done();
        });
    });

    it('Should be able to query the api when providing token', (done) => {
        chai.request(baseUrl)
        .get('/')
        .query({token: config.testAccount.token})
        .end(function (err, res) {
            expect(err).toEqual(null);
            expect(res.body.httpCode).toEqual(200);
            expect(res.body.response).toBeTruthy();
            
            done();
        });
    });
})

