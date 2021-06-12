/*
    Users's router / Auth
    host + /api/auth
*/

const {Router} = require('express');
const {check} = require('express-validator');
const {validateFields} = require('../middlewares/validate-fields');
const {createUser, loginUser, renewToken} = require('../controllers/auth');
const {validateJWT} = require('../middlewares/validate-jwt');

const router = Router();

router.post(
    '/new',
    [
        check('name', 'Name cannot be empty').notEmpty(),
        check('email', 'Email should be formatted correctly').isEmail(),
        check('password', 'Password should have at least 6 characters').isLength({min: 6}),
        validateFields
    ],
    createUser
);

router.post(
    '/',
    [
        check('email', 'Email should be formatted correctly').isEmail(),
        check('password', 'Password should have at least 6 characters').isLength({min: 6}),
        validateFields
    ],
    loginUser
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;