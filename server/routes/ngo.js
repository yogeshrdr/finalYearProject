const express = require('express');
const {check} = require('express-validator');

const router = express.Router();
const validate = require('../middleware/validator');
const Ngo = require('../controllers/ngo');
const Auth = require('../middleware/auth');

router.post('/registerNgo',[
    check('name').not().isEmpty().withMessage({success: false, message: 'name is requried'}),
    check('email').isEmail().not().isEmpty().withMessage({success: false, message: 'Email is requried'}),
    check('password').not().isEmpty().withMessage({success: false, message: 'Password is requried'})
], validate, Ngo.register);

router.post('/addDocument',[
    check('uniqueId').not().isEmpty().withMessage({success: false, message: 'uniqueId is requried'}),
    check('address').not().isEmpty().withMessage({success: false, message: 'address is requried'}),
    check('phoneno').not().isEmpty().withMessage({success: false, message: 'phoneno is requried'}),
    check('fssai').not().isEmpty().withMessage({success: false, message: 'fssaiCertificate is requried'}),
    check('registrationCertificate').not().isEmpty().withMessage({success: false, message: 'registrationCertificate is requried'}),
    check('adharCard').not().isEmpty().withMessage({success: false, message: 'adharCard is requried'})
], validate, Auth, Ngo.addDocument);


router.post('/loginNgo',[
    check('email').isEmail().not().isEmpty().withMessage({success: false, message: 'Email is requried'}),
    check('password').not().isEmpty().withMessage({success: false, message: 'Password is requried'}),
], validate, Ngo.login);

router.post('/addPublicFridge',Auth, Ngo.addPublicFridge);

router.get('/getNgoPublicFridge', Auth, Ngo.getNgoPublicFridge);
router.get('/getAllFridge', Auth, Ngo.getAllFridge);
router.post('/getFrigeNearLocation', Auth, Ngo.getFrigeNearLocation);
router.get('/specificFridge/:id', Auth, Ngo.specificFridge);

router.post('/donateFridge', Auth, Ngo.donateFridge)

router.post('/actionFridge', Auth, Ngo.actionFridge)







module.exports = router;