import fs from 'fs';
import uuid from 'uuid/v1';
const chai = require('chai'),
  chaiHttp = require('chai-http');
const faker = require('faker');
const { baseUrl, gitPath } = require('../src/config');
import testUser from './fixtures/user.json';
const { createRepository } = require('services/repository/repository.service');
chai.use(chaiHttp);

describe('Repository Test Suite', () => {
  const repoName = uuid();
  const description = 'some description';
  const message = 'fist commit message';
  const username = 'roberto';
  const email = 'robert@gmail.com';
  let appToken;

  beforeAll(done => {
    chai
      .request(baseUrl)
      .post('/user/login')
      .send(testUser)
      .end((_, res) => {
        const {
          response: { token }
        } = res.body;
        appToken = token;
        done();
      });
  });

  it('should create a new Repository', async () => {
    const result = await createRepository(
      { username, email },
      repoName,
      description,
      message
    );
    expect(typeof result.tostrS()).toEqual('string');
  });

  it("should list repository's history log", done => {
    chai
      .request(baseUrl)
      .get(`/repository/${repoName}/history`)
      .query({ branch: 'master' })
      .set('x-api-key', appToken)
      .end(function(err, res) {
        const { response } = res.body;
        expect(err).toBeFalsy();
        expect(response.length).toEqual(1);
        expect(response[0].email).toEqual(email);
        expect(response[0].author).toEqual(username);
        expect(response[0].comment).toEqual(message);
        done();
      });
  });

  it('should create a new branch', done => {
    const body = { branch: 'develop the world' };
    chai
      .request(baseUrl)
      .post(`/repository/${repoName}/branch`)
      .send(body)
      .set('x-api-key', appToken)
      .end(function(err, res) {
        const { response } = res.body;
        expect(err).toBeFalsy();
        expect(response).toEqual({ branch: 'develop-the-world' });
        done();
      });
  });

  it("should list all repo's branches", done => {
    chai
      .request(baseUrl)
      .get(`/repository/${repoName}/branch`)
      .set('x-api-key', appToken)
      .end(function(err, res) {
        const { response } = res.body;
        expect(err).toBeFalsy();
        expect(response.length).toBe(2);
        expect(response.includes('develop-the-world')).toBeTruthy();
        done();
      });
  });

  afterAll(() => {
    fs.rmdirSync(`${gitPath}/${repoName}`, { recursive: true });
  });
});
