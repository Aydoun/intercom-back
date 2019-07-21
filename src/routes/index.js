import express from 'express';
import userRoutes from './user';
import filesRoutes from './files';
import plansRoutes from './plans';
import conversationRoutes from './conversation';
import mailRoutes from './mail';
import repositoryRoutes from './repository';
import InvitationRoutes from './invitation';
import { welcomeJson } from 'utils';
const Router = express.Router();

Router.use('/', (req, res) => res.formatResponse(welcomeJson));
Router.use('/user', userRoutes);
Router.use('/files', filesRoutes);
Router.use('/plan', plansRoutes);
Router.use('/conversation', conversationRoutes);
Router.use('/mail', mailRoutes);
Router.use('/repository', repositoryRoutes);
Router.use('/invitation', InvitationRoutes);

//TODO: Add issue management

module.exports = Router;
