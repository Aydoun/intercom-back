
import * as S from 'services/user/user.service';
// import { sendMail } from 'services/mail/mail.service';
import { pushActivity } from 'services/activity/activity.service';
// import welcomeTemplate from 'templates/welcome';
import { ActivityPoint, ActivityType } from 'constants';

export const userDetails = (req, res) => {
  const { id } = req.tokenData;

  return S.getUser(id)
    .then(user => res.formatResponse(user))
    .catch(err => res.formatResponse(err.message, 401));
};

export const getUserById = (req, res) => {
  const { id } = req.params;

  return S.getUser(id)
    .then(user => res.formatResponse(user))
    .catch(err => res.formatResponse(err.message, 401));
};

export const userPlansList = (req, res) => {
  const { id } = req.tokenData;

  return S.getUsersPlan(id)
    .then(plans => res.formatResponse(plans))
    .catch(err => res.formatResponse(err.message, 401));
};

export const searchByname = (req, res) => {
  const { name } = req.query;

  return S.searchUser(name)
    .then(users => res.formatResponse(users))
    .catch(err => res.formatResponse(err.message, 401));
};

export const login = (req, res) => {
  const { email, password } = req.body;

  return S.loginUser(email, password)
    .then(data => res.formatResponse(data))
    .catch(err => res.formatResponse(err.message, 401));
};

export const register = (req, res) => {
  const { name, email, password } = req.body;
  const pointValue = ActivityPoint.registration;
  const typeValue = ActivityType.registration;
  let newUser;

  return S.registerUser(name, email, password)
    .then(data => {
      newUser = data;
    })
    .then(() => pushActivity(newUser._id, pointValue, typeValue))
    .then(() => {
      return res.formatResponse(newUser, 200, pointValue);
    })
    // .then(() => sendMail(data.email, welcomeTemplate, 'Welcome to use Intercom'))
    .catch(err => res.formatResponse(err.message, 401));
};

export const update = (req, res) => {
  const { id } = req.tokenData;

  return S.updateUser(id, req.body)
    .then(response => res.formatResponse(response))
    .catch(err => res.formatResponse(err.message, 401));
};

export const remove = (req, res) => {
  const { id } = req.tokenData;

  return S.deleteUser(id)
    .then(response => res.formatResponse(response))
    .catch(err => res.formatResponse(err.message, 401));
};

export const planIntersection = (req, res) => {
  const { id: firstUser } = req.tokenData;
  const { userId: secondUser } = req.query;

  return S.getIntersection(firstUser, secondUser)
    .then(response => res.formatResponse(response))
    .catch(err => res.formatResponse(err.message, 401));
};
