const config = {
  host: 'http://127.0.0.1',
  devdb: 'mongodb://amino:QAZzaq123@ds111012.mlab.com:11012/intercom',
  testdb: 'mongodb://amino:QAZzaq123@ds347707.mlab.com:47707/intercom-test',
  port: 3001,
  jwtSecret: 'my-api-secret',
  gitPath: '/var/intercom',
  jwtDuration: '2 hours',
  mail: {
    auth: {
      user: 'mohamed.aydoun@frontmen.nl',
      pass: 'bwqvijpadfrredng'
    },
    service: 'gmail',
    host: 'smtp.gmail.com',
    sender: 'mohamed.aydoun@frontmen.nl'
  }
};

module.exports = config;
