const UserModel = require('../../models/user.model');
const { isValidObjectId, securePassword, comparePasswords } = require('../../utils');

exports.getUserImp = (id) => {
    if(isValidObjectId(id)) {
        return UserModel.findById(id)
        .then(user => {
            return user;
        });
    } 

    throw new Error('User id is not valid'); 
};

exports.registerUserImp = (name, email, password) => {
    return new Promise((resolve, reject) => {
        securePassword(password, (hash, salt) => {
            if (hash !== null) {
                const newUser = new UserModel({
                    name,
                    email,
                    password: hash,
                    salt,
                });
        
                newUser.save()
                .then(user => {
                    resolve(user);
                });
            } else {
                reject(new Error('Error While Securing User Data'));
            }
        });
    });
}

exports.loginUserImp = (email, password) => {
    return UserModel.findOne({ email })
    .then(user => {
        if(!user) {
            throw new Error('Authentication failed. User not found.');
        }

        return new Promise((resolve, reject) => {
            comparePasswords(password, user.password, (err, isMatch) => {
                if (err) {
                    reject(new Error('Authentication Failed. Comparison Rejection'));
                } else if (!isMatch) {
                    reject(new Error('Authentication failed. Wrong Password'));
                } else {
                    resolve({
                        _id : user._id,
                        email : user.email,
                    });
                }
            }); 
        });   
    });
}
