const config = {
  host: "http://127.0.0.1",
  db: "mongodb://amino:QAZzaq123@ds347707.mlab.com:47707/intercom-test",
  port: 3001,
  jwtSecret: "my-api-secret",
  baseUrl: "http://127.0.0.1:3001/api",
  gitPath: "/var/intercom-test",
  jwtDuration: "2 hours",
  mail: {
    auth: {
      user: "mohamed.aydoun@frontmen.nl",
      pass: "bwqvijpadfrredng",
    },
    service: "gmail",
    host: "smtp.gmail.com",
    sender: "mohamed.aydoun@frontmen.nl",
  },
  testAccount: {
    email: "test@email.com",
    password: "12345678",
    _id: "5d34bec352a365054575cbee",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMzc1MWNmOGNiZTFlMDUyNWNhY2U2OSIsImlhdCI6MTU2Njc2MzQxM30.mrDuq2F0VbpU3y-FRVKpLAj9azb1i-4_7qMh40kp_9M",
  },
};

module.exports = config;
