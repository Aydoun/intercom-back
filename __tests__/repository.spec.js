import fs from 'fs';
import uuid from 'uuid/v1';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { baseUrl, gitPath } from '../src/config';
import testUser from './fixtures/user.json';
import { createRepository } from 'services/repository/repository.service';
import { addContent } from 'services/files/files.service';
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

  it("should retrieve repo's status", done => {
    addContent(repoName, 'file.txt', 'some content');
    chai
      .request(baseUrl)
      .get(`/repository/${repoName}/status`)
      .set('x-api-key', appToken)
      .end(function(err, res) {
        const { response, status } = res.body;
        expect(err).toBeFalsy();
        expect(status).toBeTruthy();
        expect(response.NEW.includes('file.txt')).toBeTruthy();
        done();
      });
  });

  it('should add a new commit', done => {
    chai
      .request(baseUrl)
      .post(`/repository/${repoName}/commit`)
      .send({
        username,
        email,
        message: 'second commit to the repo',
        branch: 'master'
      })
      .set('x-api-key', appToken)
      .end((err, res) => {
        const { response, status } = res.body;
        expect(err).toBeFalsy();
        expect(status).toBeTruthy();
        expect(typeof response).toEqual('string');
        done();
      });
  });

  it("should list repository's history log with newly made commit", done => {
    chai
      .request(baseUrl)
      .get(`/repository/${repoName}/history`)
      .query({ branch: 'master' })
      .set('x-api-key', appToken)
      .end(function(err, res) {
        const { response } = res.body;
        expect(err).toBeFalsy();
        expect(response.length).toEqual(2);
        expect(response[0].email).toEqual(email);
        expect(response[0].author).toEqual(username);
        expect(response[0].comment).toEqual('second commit to the repo');
        done();
      });
  });

  it('should delete a branch', done => {
    chai
      .request(baseUrl)
      .delete(`/repository/${repoName}/branch`)
      .send({ branch: 'develop-the-world' })
      .set('x-api-key', appToken)
      .end(function(err, res) {
        const { status } = res.body;
        expect(err).toBeFalsy();
        expect(status).toBeTruthy();
        done();
      });
  });

  it('should list the current repos branches', done => {
    chai
      .request(baseUrl)
      .get(`/repository/${repoName}/branch`)
      .set('x-api-key', appToken)
      .end(function(err, res) {
        const { response, status } = res.body;
        expect(err).toBeFalsy();
        expect(status).toBeTruthy();
        expect(response.length).toBe(1);
        expect(response.includes('develop-the-world')).toBeFalsy();
        done();
      });
  });

  afterAll(() => {
    fs.rmdirSync(`${gitPath}/${repoName}`, { recursive: true });
  });
});
