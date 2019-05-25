const config = {
  host: 'http://127.0.0.1',
  // db: 'mongodb://localhost/intercom',
  db: 'mongodb://amino:QAZzaq123@ds111012.mlab.com:11012/intercom',
  port: 3001,
  jwtSecret: 'my-api-secret',
  gitPath: '/var/intercom',
  jwtDuration: '2 hours',
};

module.exports = config;
