const { getUserImp } = require('./user.service.imp');
const { formatter, httpCodes } = require('../../utils');

exports.getUser = (req, res) => {
  const { id } = req.params;

  try {
    return getUserImp(id)
      .then(user => res.status(httpCodes.SUCCESS).send(formatter(user)))
      .catch(err => res.status(httpCodes.FAILURE).send(formatter(null, { message: err.message })));
  } catch (e) {
    return res.status(httpCodes.FAILURE).send(formatter(null, { message: e.message }));
  }
};
