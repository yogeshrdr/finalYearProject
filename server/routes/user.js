const express = require('express');
const {check} = require('express-validator');

const router = express.Router();
const validate = require('../middleware/validator');
const User = require('../controllers/user');
const Auth = require('../middleware/auth');

router.post('/registerUser',[
    check('name').not().isEmpty().withMessage({success: false, message: 'name is requried'}),
    check('email').isEmail().not().isEmpty().withMessage({success: false, message: 'Email is requried'}),
    check('password').not().isEmpty().withMessage({success: false, message: 'Password is requried'}),
    check('phoneno').not().isEmpty().withMessage({success: false, message: 'Phone Number is requried'}),
], validate, User.register);


router.post('/loginUser',[
    check('email').isEmail().not().isEmpty().withMessage({success: false, message: 'Email is requried'}),
    check('password').not().isEmpty().withMessage({success: false, message: 'Password is requried'}),
], validate, User.login);


module.exports = router;