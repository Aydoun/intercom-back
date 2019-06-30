import express from 'express';
import userRoutes from './user';
import filesRoutes from './files';
import plansRoutes from './plans';
import mailRoutes from './mail';

const Router = express.Router();

Router.use('/user', userRoutes);
Router.use('/files', filesRoutes);
Router.use('/plan', plansRoutes);
Router.use('/mail', mailRoutes);

module.exports = Router;
