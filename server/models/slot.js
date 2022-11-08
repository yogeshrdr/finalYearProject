const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();


const slotSchema = new Schema({
    FridgesID:{
        type: Schema.Types.ObjectId,
        ref: 'publicFridge'
    },
    DonationID:{
        type: Schema.Types.ObjectId,
        ref: 'donation'
    },
    slotNumber:{
        type: Number,
        default:0
    },
    isFree:{
        type: Boolean,
        default: true
    }
}, { timestamps: true});


module.exports = mongoose.model('slots', slotSchema);