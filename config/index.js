const config = {
  env: 'test',
  db: 'mongodb://localhost/intercom',
  port: 3000,
  jwtSecret: 'my-api-secret',
  jwtDuration: '2 hours'
};

module.exports = config;
