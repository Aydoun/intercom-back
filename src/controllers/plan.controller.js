
import {
  savePlan, getPlan, updatePlan, removePlan,
} from 'services/plan/plan.service';
import { createRepository } from 'services/git/git.service';
import uuid from 'uuid/v1';

export const PersistPlan = (req, res) => {
    const { title, description, username, email } = req.body;
    const { id } = req.tokenData;
    const repoName = uuid();

    if (title && description && username && email) {
        createRepository({ username, email }, repoName, description)
        .then(() => {
            return savePlan({ id, title, description, repoName });
        })
        .then(response => {
            res.formatResponse(response);
        })
        .catch(err => {
            res.formatResponse(err.message, 401);
        })
    } else {
        res.formatResponse('Request Body is Empty', 401);
    }
};

export const getPlanById = (req, res) => {
    const { id } = req.params;

    if(id) {
        getPlan(id)
        .then(plan => {
            res.formatResponse(plan);
        })
        .catch(err => {
            res.formatResponse(err.message, 401);
        });
    } else {
        res.formatResponse('Invalid plan id', 401);
    }
};


export const updateById = (req, res) => {
    const { id } = req.params;
    const body = req.body;

    if(id && body) {
        updatePlan(id, body)
        .then(plan => {
            res.formatResponse(plan);
        })
        .catch(err => {
            res.formatResponse(err.message, 401);
        });
    } else {
        res.formatResponse('Invalid plan id', 401);
    }
};


export const removeById = (req, res) => {
    const { id } = req.params;
    
    if(id) {
        removePlan(id)
        .then(plan => {
            res.formatResponse(plan);
        })
        .catch(err => {
            res.formatResponse(err.message, 401);
        });
    } else {
        res.formatResponse('Invalid plan id', 401);
    }
};
