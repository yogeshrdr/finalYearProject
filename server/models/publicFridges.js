const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });


const fridgeSlotSchema = new Schema({
    slotnumber:{
        type: Number,
        index:true,
        sparse:true
    },
    donationID:{
        type: Schema.Types.ObjectId,
        ref: 'donation',        
    } 
})

const fridgeSchema = new Schema({
    ngoID:{
        type: Schema.Types.ObjectId,
        ref: 'ngo'
    },
    totalSlots:{
        type: Number,
    },
    totalDonations:{
        type: Number,
        default: 0
    },
    fridgeType:{
        type: String,
        deafult:"food"
    },
    fridgeSlotBooked:[{
        type: Number
    }],
    fridgeSlotStatus:[{
       type: fridgeSlotSchema
    }],
    address:{
        type: String,
    },
    location:{
        type: pointSchema,
        index: '2dsphere'
    },
    isFull:{
        type: Boolean, 
        default: false
    }
}, { timestamps: true});


module.exports = mongoose.model('publicFridge', fridgeSchema );