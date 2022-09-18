const express = require('express');
const {check} = require('express-validator');

const router = express.Router();
const validate = require('../middleware/validator');
const Drive = require('../controllers/ngoDrives');
const Auth = require('../middleware/auth');

router.post('/addDrive',[
    check('driveDescription').not().isEmpty().withMessage({success: false, message: 'driveDescription is requried'}),
    check('startDate').not().isEmpty().withMessage({success: false, message: 'startDate is requried'}),
    check('endDate').not().isEmpty().withMessage({success: false, message: 'endDate is requried'}),
    check('typeRequired').not().isEmpty().withMessage({success: false, message: 'typeRequired is requried'}),
    check('coord').not().isEmpty().withMessage({success: false, message: 'coordinates is requried'}),
    check('address').not().isEmpty().withMessage({success: false, message: 'address is requried'}),
], validate, Auth, Drive.addDrive);

router.post('/addDonationDrive',[
    check('driveId').not().isEmpty().withMessage({success: false, message: 'driveId is requried'}),
], validate, Auth, Drive.addDonation);

router.get('/ngoDrive',Auth, Drive.ngoDrive);

router.get('/specificngoDrive/:id',[
    check('id').not().isEmpty().withMessage({success: false, message: 'driveId is requried'}),
], validate, Drive.specificngoDrive);


module.exports = router;