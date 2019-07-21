// eslint-disable-next-line import/no-extraneous-dependencies
require('@babel/register')({
  presets: ['@babel/preset-env'],
});
const config = require('../config');
const { connectToDb } = require('./connect');
const server = require('./server');

connectToDb(() => {
  server.listen(config.port, () => {
    console.log(`Mongoose connected, env = ${process.env.NODE_ENV}`);
    console.log(`Server Port = ${config.port}`);
  });
});