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
    }
}, { timestamps: true});


module.exports = mongoose.model('donation', donationSchema);