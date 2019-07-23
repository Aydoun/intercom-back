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
  },
  testAccount: {
    email: 'test@email.com',
    password: '12345678',
    _id: '5d34bec352a365054575cbee',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMzc1MWNmOGNiZTFlMDUyNWNhY2U2OSIsImlhdCI6MTU2MzkwNjUxMX0.NdznCqHPm5g2PWCXaO3W9E8EtohiQcxYB56UZp3U_IU',
  }
};

module.exports = config;
