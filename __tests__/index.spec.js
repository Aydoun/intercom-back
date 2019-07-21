const chai = require('chai')
  , chaiHttp = require('chai-http');
const { welcomeJson } = require('utils');

chai.use(chaiHttp);

describe('App /GET', () => {
    it('Api Health Check', (done) => {
        chai.request('http://localhost:3001/api')
        .get('/')
        .end(function (err, res) {
            expect(err).toEqual(null);
            expect(res.body.httpCode).toEqual(200);
            expect(res.body.response).toEqual(welcomeJson);
            
            done();
        });
    })
})

