import express from 'express';
import userRoutes from './user';
import filesRoutes from './files';
import plansRoutes from './plans';
import conversationRoutes from './conversation';

const Router = express.Router();

Router.use('/user', userRoutes);
Router.use('/files', filesRoutes);
Router.use('/plan', plansRoutes);
Router.use('/conversation', conversationRoutes);

module.exports = Router;
