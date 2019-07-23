
import * as U from 'services/user/user.service';
import { sendMail } from 'services/mail/mail.service';
import welcomeTemplate from 'templates/welcome';

export const userDetails = (req, res) => {
  const { id } = req.tokenData;

  return U.getUser(id)
    .then(user => res.formatResponse(user))
    .catch(err => res.formatResponse(err.message, 401));
};

export const getUserById = (req, res) => {
  const { id } = req.params;

  return U.getUser(id)
    .then(user => res.formatResponse(user))
    .catch(err => res.formatResponse(err.message, 401));
};

export const userPlansList = (req, res) => {
  const { id } = req.tokenData;

  return U.getUsersPlan(id)
  .then(plans => res.formatResponse(plans))
  .catch(err => res.formatResponse(err.message, 401));
};

export const login = (req, res) => {
  const { email, password } = req.body;

  return U.loginUser(email, password)
    .then(data => res.formatResponse(data))
    .catch(err => res.formatResponse(err.message, 401));
};

export const register = (req, res) => {
  const { name, email, password } = req.body;

  return U.registerUser(name, email, password)
    .then(data => {
      res.formatResponse(data);
    })
    .then(() => sendMail(data.email, welcomeTemplate, 'Welcome to use Intercom'))
    .catch(err => res.formatResponse(err.message, 401));
};

export const update = (req, res) => {
  const { id } = req.tokenData;

  return U.updateUser(id, req.body)
    .then(response => res.formatResponse(response))
    .catch(err => res.formatResponse(err.message, 401));
};

export const remove = (req, res) => {
  const { id } = req.tokenData;
  
  return U.deleteUser(id)
    .then(response => res.formatResponse(response))
    .catch(err => res.formatResponse(err.message, 401));
};
