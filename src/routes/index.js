const Router = require('express').Router();
const userRoutes = require('./user.route');
const filesRoutes = require('./files.route');
const plansRoutes = require('./plans');

Router.use('/user', userRoutes);
Router.use('/files', filesRoutes);
Router.use('/plan', plansRoutes);

module.exports = Router;
