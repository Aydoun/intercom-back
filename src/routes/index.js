const Router = require('express').Router();
const userRoutes = require('./user.route');
const filesRoutes = require('./files.route');

Router.use('/user', userRoutes);
Router.use('/files', filesRoutes);

module.exports = Router;
