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


const ngoDrivesSchema = new Schema({
    ngoId:{
        type: Schema.Types.ObjectId,
        ref: 'ngo'
    },
    driveDescription:{
        type: String,
    },
    startDate:{
        type: Number,
    },
    endDate:{
        type: Number,
    },
    typeRequired:{
        type: String,
        default: 'food'
    },
    progess:{
        type: Number,
        default: 0
    },
    address:{
        type: String,
    },
    location:{
        type: pointSchema,
        index :'2dsphere'
    }
}, { timestamps: true});


module.exports = mongoose.model('ngoDrives', ngoDrivesSchema);