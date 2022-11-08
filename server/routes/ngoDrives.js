const express = require('express');
const {check} = require('express-validator');

const router = express.Router();
const validate = require('../middleware/validator');
const Drive = require('../controllers/ngoDrives');
const Auth = require('../middleware/auth');

router.post('/addDrive',[
    check('driveName').not().isEmpty().withMessage({success: false, message: 'driveName is requried'}),
    check('description').not().isEmpty().withMessage({success: false, message: 'description is requried'}),
    check('startDate').not().isEmpty().withMessage({success: false, message: 'startDate is requried'}),
    check('endDate').not().isEmpty().withMessage({success: false, message: 'endDate is requried'}),
    check('coord').not().isEmpty().withMessage({success: false, message: 'coordinates is requried'}),
    check('address').not().isEmpty().withMessage({success: false, message: 'address is requried'}),
    check('estimatedDonation').not().isEmpty().withMessage({success: false, message: 'estimatedDonation is requried'}),
], validate, Auth, Drive.addDrive);

router.post('/addDonationDrive',[
    check('driveId').not().isEmpty().withMessage({success: false, message: 'driveId is requried'}),
], validate, Auth, Drive.addDonation);

router.get('/ngoDrive',Auth, Drive.ngoDrive);

router.get('/getallDrive',Auth, Drive.getallDrive);
router.get('/specificngoDrive/:id',[
    check('id').not().isEmpty().withMessage({success: false, message: 'driveId is requried'}),
], validate, Drive.specificngoDrive);

router.post('/addDriveDonation',[
    check('ngoId').not().isEmpty().withMessage({success: false, message: 'ngoId is requried'}),
    check('driveId').not().isEmpty().withMessage({success: false, message: 'driveId is requried'}),
    check('amount').not().isEmpty().withMessage({success: false, message: 'amount is requried'}),
], validate, Auth, Drive.addDriveDonation);





module.exports = router;