const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const documentSchema = new Schema({
    type:{
        type: String,
        required: 'document Type is required',
    },
    document:{
        type: String,
        requried: 'document is Required'
    }
});


const ngoSchema = new Schema({
    name:{
        type: String,
        required: 'Name is Required',
    },
    email:{
        type: String,
        unique: true,
        required: 'Email is Required',
    },
    password:{
        type: String,
        required: 'Password is Required',
    },
    phoneno:{
        type: Number,
    },
    address:{
        type: String,
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isDocumnetUploaded:{
        type: Boolean,
        default: false
    },
    uniqueId:{
        type: String,
        default: null
    },
    fssai:{
        type: String,
        default: null
    },
    registrationCertificate:{
        type: String,
        default: null
    },
    adharCard:{
        type: String,
        default: null
    },
    donation:[{ 
        type: Schema.Types.ObjectId,
        ref: 'donation'
    }],
    publicFridges:[{
        type: Schema.Types.ObjectId,
        ref: 'publicFridge'
    }],
    ngoDrives:[{
        type: Schema.Types.ObjectId,
        ref: 'ngoDrives'
    }]
}, { timestamps: true});


ngoSchema.methods.generateJWT = function(){
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 360);

    let payload = {
        id: this._id,
        type: 'ngo'
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    });
};

ngoSchema.methods.comparePassword = function (password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('ngo', ngoSchema);