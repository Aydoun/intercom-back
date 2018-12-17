const ObjectId = require('mongoose').Types.ObjectId;
const util = require('util');
const bcrypt = require('bcrypt-nodejs');
const genSalt = util.promisify(bcrypt.genSalt);
const hash = util.promisify(bcrypt.hash);
const compare = util.promisify(bcrypt.compare);

exports.formatter = (data, error) => {
    if (!error) {
        return {
            status: !error,
            result: data,
        };
    }

    return {
        status: !error,
        result: {
            message: error.message,
        },
    };
}

exports.securePassword = function (plainPassword) {
    let _salt;
    return genSalt(10)
        .then(salt => {
            _salt = salt;
            return hash(plainPassword, salt, null)
        })
}

exports.comparePasswords = (candidatePassword, storedPAssword, cb) => {
    return compare(candidatePassword, storedPAssword)
};

exports.isValidObjectId = (id) => ObjectId.isValid(id);

exports.httpCodes = {
    SUCCESS: 200,
    FAILURE: 401,
}
