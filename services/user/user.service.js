const { getUserImp } = require('./user.service.imp');
const { formatter, httpCodes } = require('../../utils');

exports.getUser = (req, res) => {
    const { id } = req.params;

    try {
        getUserImp(id)
        .then(user => {
            return res.status(httpCodes.SUCCESS).send(formatter(user));
        })
        .catch(err => {
            return res.status(httpCodes.FAILURE).send(formatter(null, { message: err.message}))
        })
    } catch(e) {
        return res.status(httpCodes.FAILURE).send(formatter(null, { message: e.message}))
    }
};