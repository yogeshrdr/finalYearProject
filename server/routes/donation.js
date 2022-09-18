const express = require('express');
const {check} = require('express-validator');

const router = express.Router();
const validate = require('../middleware/validator');
const Donation = require('../controllers/donation');
const Auth = require('../middleware/auth');

router.post('/addDonation',[
    check('publicFridgesID').not().isEmpty().withMessage({success: false, message: 'publicFridgesID is requried'}),
], validate, Auth, Donation.addDonation);
    
router.post('/actionDonation',[
    check('status').not().isEmpty().withMessage({success: false, message: 'status is requried'}),
    check('donationID').not().isEmpty().withMessage({success: false, message: 'donationID is requried'}),
], validate, Donation.actionDonation);

router.get('/getUserDonation', Auth, Donation.getUserDonation);

router.get('/getNgoDonation', Auth, Donation.getNgoDonation);

router.get('/getSpecificDonation/:id',[
    check('id').not().isEmpty().withMessage({success: false, message: 'DonationId is requried'}),
], validate, Donation.getSpecificDonation);



module.exports = router;