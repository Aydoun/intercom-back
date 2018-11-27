const UserModel = require('../../models/user.model');
const { isValidObjectId } = require('../../utils');

exports.getUserImp = (id) => {
    if(isValidObjectId(id)) {
        return UserModel.findById(id)
        .then(user => {
            return user;
        });
    } 

    throw new Error('User id is not valid'); 
};