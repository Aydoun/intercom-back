const {
  getUserImp, updateUserImp, registerUserImp, loginUserImp, changePasswordImp, deleteUserImp,
} = require('./user.service.imp');

const getUser = id => getUserImp(id);
const updateUser = (id, newData) => updateUserImp(id, newData);
const deleteUser = id => deleteUserImp(id);
const registerUser = (name, email, password) => registerUserImp(name, email, password);
const loginUser = (email, password) => loginUserImp(email, password);
const changePassword = (id, oldPassowrd, newPassword) => changePasswordImp(id, oldPassowrd, newPassword);

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  changePassword,
};
