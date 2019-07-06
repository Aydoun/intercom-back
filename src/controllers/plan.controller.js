
import * as S from 'services/plan/plan.service';
import { createRepository } from 'services/repository/repository.service';
import { addPlan } from 'services/user/user.service';
import uuid from 'uuid/v1';

export const PersistPlan = (req, res) => { 
    const { title, description, username, email } = req.body;
    const { id } = req.tokenData;
    const repoName = uuid();
    const message = `${title} is created`;
    let newPlan;

    createRepository({ username, email }, repoName, description, message)
    .then(() => {
        return S.savePlan({ creator: id, title, description, repoName });
    })
    .then(plan => {
        newPlan = plan;
        return addPlan(id, plan._id);
    })
    .then(() => {
        res.formatResponse(newPlan);
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};

export const getPlanById = (req, res) => {
    const { id } = req.params;

    S.getPlan(id)
    .then(plan => {
        res.formatResponse(plan);
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};

export const updateById = (req, res) => {
    const body = req.body;
    const { id } = req.params;

    if(body) {
        S.updatePlan(id, body)
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
    
    S.removePlan(id)
    .then(plan => {
        res.formatResponse(plan);
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};
