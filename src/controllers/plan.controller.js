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

export const searchPlan = (req, res) => {
  const { term } = req.query;

  S.searchPlan(term)
    .then(plans => {
      res.formatResponse(plans);
    })
    .catch(err => {
      res.formatResponse(err.message, 401);
    });
};

export const updateById = (req, res) => {
  const body = req.body;
  const { id } = req.params;

  if (body) {
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

export const likePlan = (req, res) => {
  const { id: planId } = req.params;
  const { id: userId } = req.tokenData;

  S.registerLike(planId, userId)
    .then(response => {
      res.formatResponse(response);
    })
    .catch(err => {
      res.formatResponse(err.message, 401);
    });
};

export const Unregister = (req, res) => {
  const { id: planId } = req.params;
  const { id: userId } = req.tokenData;

  S.unregisterPlan(planId, userId)
    .then(response => {
      res.formatResponse(response);
    })
    .catch(err => {
      res.formatResponse(err.message, 401);
    });
};

export const addIssue = (req, res) => {
  const { id: planId } = req.params;
  const { id: userId } = req.tokenData;

  S.addIssue(planId, userId, req.body)
    .then(response => {
      res.formatResponse(response);
    })
    .catch(err => {
      res.formatResponse(err.message, 401);
    });
};

export const listIssue = (req, res) => {
  const { id } = req.params;

  S.getIssues(id)
    .then(response => {
      res.formatResponse(response);
    })
    .catch(err => {
      res.formatResponse(err.message, 401);
    });
};

export const addIssueComment = (req, res) => {
  const { id: planId, issueId } = req.params;
  const { id: userId } = req.tokenData;
  const { text } = req.body;

  S.addIssueComment(issueId, planId, userId, text)
    .then(response => {
      res.formatResponse(response);
    })
    .catch(err => {
      res.formatResponse(err.message, 401);
    });
};
