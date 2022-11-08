const express = require('express');
const {check} = require('express-validator');

const router = express.Router();
const validate = require('../middleware/validator');
const Admin = require('../controllers/admin');
const Auth = require('../middleware/auth');


router.post('/registerAdmin', [
    check('name').not().isEmpty().withMessage({success: false, message: 'name is requried'}),
    check('email').isEmail().not().isEmpty().withMessage({success: false, message: 'Email is requried'}),
    check('password').not().isEmpty().withMessage({success: false, message: 'Password is requried'}),
], validate, Admin.register);

router.post('/loginAdmin',[
    check('email').isEmail().not().isEmpty().withMessage({success: false, message: 'Email is requried'}),
    check('password').not().isEmpty().withMessage({success: false, message: 'Password is requried'}),
], validate, Admin.login);


router.post('/verifyNgo',[
    check('id').not().isEmpty().withMessage({success: false, message: 'NgoId is requried'}),
], validate, Auth, Admin.verifyNgo);

router.post('/rejectNgo',[
    check('id').not().isEmpty().withMessage({success: false, message: 'NgoId is requried'}),
], validate, Auth, Admin.rejectNgo);


router.get('/getallNgo', Auth, Admin.getallNgo);


router.get('/specificNgo/:id',[
    check('id').not().isEmpty().withMessage({success: false, message: 'NgoId is requried'}),
], validate, Auth, Admin.specificNgo);


module.exports = router;