const express = require('express');
const {check} = require('express-validator');

const router = express.Router();
const validate = require('../middleware/validator');
const Fridges = require('../controllers/publicFriges');
const Auth = require('../middleware/auth');

router.post('/addFridges',[
    check('totalSlots').not().isEmpty().withMessage({success: false, message: 'totalSlots is requried'}),
    check('fridgeType').not().isEmpty().withMessage({success: false, message: 'fridgeType is requried'}),
    check('coord').not().isEmpty().withMessage({success: false, message: 'coordinates is requried'}),
    check('address').not().isEmpty().withMessage({success: false, message: 'address is requried'}),
],validate, Auth, Fridges.addFridges);

router.post('/getFridgesUser',[
    check('coord').not().isEmpty().withMessage({success: false, message: 'coordinates are requried'}),
], validate, Auth, Fridges.userFridge);

router.get('/getFridgesNgo', Auth, Fridges.ngoFridge);

// router.put('/Fridges');

module.exports = router;

