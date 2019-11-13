import express from 'express';
import { exp } from 'controllers/experiment.controller';

const experiment = express.Router();

experiment.get('', exp);

module.exports = experiment;
