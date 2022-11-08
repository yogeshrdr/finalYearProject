const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();


const donationSchema = new Schema({
    ngoID:{
        type: Schema.Types.ObjectId,
        ref: 'ngo'
    },
    userID:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    publicFridgesID:{
        type: Schema.Types.ObjectId,
        ref: 'publicFridge'
    },
    driveId:{
        type: Schema.Types.ObjectId,
        ref: 'ngoDrives'
    },
    status:{
        type: String,
        default: 'pending'
    },
    donationType:{
        type: String,
        default:'publicFridge'
    },
    slotNumber:{
        type: Number
    },
    totalAmount:{
        type: Number,
        default: 0
    }
}, { timestamps: true});


module.exports = mongoose.model('donation', donationSchema);