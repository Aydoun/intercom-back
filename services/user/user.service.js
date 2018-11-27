const { getUserImp } = require('./user.service.imp');
const { formatter } = require('../../utils');

exports.getUser = (req, res) => {
    const { id } = req.params;

    try {
        getUserImp(id)
        .then(user => {
            return res.status(200).send(formatter(user));
        })
        .catch(err => {
            return res.status(401).send(formatter(null, { message: err.message}))
        })
    } catch(e) {
        return res.status(401).send(formatter(null, { message: e.message}))
    }
};