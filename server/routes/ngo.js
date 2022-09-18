const express = require('express');
const {check} = require('express-validator');

const router = express.Router();
const validate = require('../middleware/validator');
const Ngo = require('../controllers/ngo');
const Auth = require('../middleware/auth');

router.post('/registerNgo',[
    check('name').not().isEmpty().withMessage({success: false, message: 'name is requried'}),
    check('email').isEmail().not().isEmpty().withMessage({success: false, message: 'Email is requried'}),
    check('password').not().isEmpty().withMessage({success: false, message: 'Password is requried'}),
    check('phoneno').not().isEmpty().withMessage({success: false, message: 'Phone Number is requried'}),
    check('address').not().isEmpty().withMessage({success: false, message: 'address is requried'}),
], validate, Ngo.register);

router.post('/addDocument',[
    check("document.*.type").not().isEmpty().withMessage({success: false, message: 'document type is requried'}),
    check("document.*.document").not().isEmpty().withMessage({success: false, message: 'document link is requried'}),
], validate, Auth, Ngo.addDocument);

router.post('/loginNgo',[
    check('email').isEmail().not().isEmpty().withMessage({success: false, message: 'Email is requried'}),
    check('password').not().isEmpty().withMessage({success: false, message: 'Password is requried'}),
], validate, Ngo.login);

module.exports = router;