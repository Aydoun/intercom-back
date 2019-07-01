
import {
  savePlan, getPlan, updatePlan, removePlan,
} from 'services/plan/plan.service';
import { createRepository } from 'services/repository/repository.service';
import uuid from 'uuid/v1';

export const PersistPlan = (req, res) => { 
    const { title, description, username, email } = req.body;
    const { id } = req.tokenData;
    const repoName = uuid();
    const message = `${title} is created`;

    createRepository({ username, email }, repoName, description, message)
    .then(() => {
        return savePlan({ id, title, description, repoName });
    })
    .then(response => {
        res.formatResponse(response);
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};

export const getPlanById = (req, res) => {
    const { id } = req.params;

    getPlan(id)
    .then(plan => {
        res.formatResponse(plan);
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};

export const updateById = (req, res) => {
    const { id } = req.params;

    if(body) {
        updatePlan(id, body)
        .then(plan => {
            res.formatResponse(plan);
        })
        .catch(err => {
            res.formatResponse(err.message, 401);
        });
    } else {
        res.formatResponse('Request body is empty', 401);
    }
};

export const removeById = (req, res) => {
    const { id } = req.params;
    
    removePlan(id)
    .then(plan => {
        res.formatResponse(plan);
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};
