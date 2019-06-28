const Router = require('express').Router();
const userRoutes = require('./user');
const filesRoutes = require('./files');
const plansRoutes = require('./plans');

Router.use('/user', userRoutes);
Router.use('/files', filesRoutes);
Router.use('/plan', plansRoutes);

module.exports = Router;
