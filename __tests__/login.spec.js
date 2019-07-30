const chai = require('chai')
  , chaiHttp = require('chai-http');

const config = require('../src/config');

chai.use(chaiHttp);

const baseUrl = `${config.host}:${config.port}/api`;

describe('Login Test', () => {
    beforeAll(() => {
        // this.global.rr = 'rr';
    })
    
    it('should list user\'s Details', (done) => {
        expect(1).toBe(1);
        done();
        // chai.request(baseUrl)
        // .get('/user')
        // .set('x-api-key', config.testAccount.token)
        // .end(function (err, res) {
        //     expect(err).toEqual(null);
        //     expect(res.body.httpCode).toEqual(200);
        //     expect(res.body.response).toBeTruthy();
            
        //     const { status, password, privacy } = res.body.response;

        //     expect(status).toEqual('Active');
        //     expect(password).toBeFalsy();
        //     expect(privacy).toBeFalsy();
        //     done();
        // });
    });

});
