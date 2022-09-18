const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const adminSchema = new Schema({
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
    }
}, { timestamps: true});


adminSchema.methods.generateJWT = function(){
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 360);

    let payload = {
        id: this._id,
        type: 'admin'
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    });
};

adminSchema.methods.comparePassword = function (password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('admin', adminSchema);