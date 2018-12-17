const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt-nodejs') ;

exports.formatter = (data, error) => {
    if(!error) {
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

exports.securePassword = function(plainPassword, next){
    bcrypt.genSalt(10, (saltError, salt) => {
        if (saltError) {
          next(null)
        }
    
        bcrypt.hash(plainPassword, salt, null, (hashError, hash) => {
          if (hashError) {
            next(null)
          }
          next(hash, salt)
        });
    });
}

exports.comparePasswords = (candidatePassword, storedPAssword, cb) => {
    bcrypt.compare(candidatePassword, storedPAssword, (err, isMatch) => {
        console.log(err);
      if (err) { return cb(err); }
  
      cb(null, isMatch);
    });
};

exports.isValidObjectId = (id) =>  ObjectId.isValid(id);

exports.isValidEmail = (email) => true;

exports.httpCodes = {
    SUCCESS: 200,
    FAILURE: 401,
}
