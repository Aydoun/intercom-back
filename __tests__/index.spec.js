const chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('/GET', () => {
    it('Api Health Check', (done) => {
        chai.request('http://localhost:3001')
        .get('/')
        .end(function (err, res) {
            expect(err).toEqual(null);
            expect(res.body.httpCode).toEqual(403);
            
            done();
        });
    })
})

