const ObjectId = require('mongoose').Types.ObjectId;

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

exports.isValidObjectId = (id) =>  ObjectId.isValid(id);
