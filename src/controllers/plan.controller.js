
import {
  savePlan,
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
