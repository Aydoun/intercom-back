const {
  getUserImp, updateUserImp, registerUserImp, loginUserImp, changePasswordImp, deleteUserImp,
} = require('./user.service.imp');

exports.getUser = id => getUserImp(id);
exports.updateUser = (id, newData) => updateUserImp(id, newData);
exports.deleteUser = id => deleteUserImp(id);
exports.registerUser = (name, email, password) => registerUserImp(name, email, password);
exports.loginUser = (email, password) => loginUserImp(email, password);
exports.changePassword = (id, oldPassowrd, newPassword) => changePasswordImp(id, oldPassowrd, newPassword);
