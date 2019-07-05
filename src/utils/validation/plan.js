import { param, body } from 'express-validator';

const routeMapper = {
    '' : {
        'GET': param('id').custom(value => isValidObjectId(value)),
        'POST': [
            body('username').exists(),
            body('email').isEmail(),
            body('description').exists(),
            body('title').exists(),
        ],
        'PUT': param('id').custom(value => isValidObjectId(value)),
        'DELETE': param('id').custom(value => isValidObjectId(value))
    },
    '/:id': {
        'GET': param('id').custom(value => isValidObjectId(value))
    }
};

exports.validation = req => {
    const { method, route } = req;
    console.log(req, 333);
    console.log(req.route, 555);
    return routeMapper[route.path][method];
};
