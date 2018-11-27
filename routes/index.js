const Router = require('express').Router();
const userRoutes = require('./user.route');

Router.use('/user', userRoutes);

module.exports = Router;
