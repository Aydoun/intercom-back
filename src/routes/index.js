import express from 'express';
import userRoutes from './user';
import filesRoutes from './files';
import plansRoutes from './plans';
import conversationRoutes from './conversation';
import mailRoutes from './mail';
import repositoryRoutes from './repository';

const Router = express.Router();

Router.use('/user', userRoutes);
Router.use('/files', filesRoutes);
Router.use('/plan', plansRoutes);
Router.use('/conversation', conversationRoutes);
Router.use('/mail', mailRoutes);
Router.use('/repository', repositoryRoutes);


//TODO: Add issue management

module.exports = Router;
