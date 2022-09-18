const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
require('dotenv').config();


const userSchema = new Schema({
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
        required: 'Phoneno is Required',
    },
    donatation:[{ 
        type: Schema.Types.ObjectId,
        ref: 'donation'
    }]
}, { timestamps: true});


userSchema.methods.generateJWT = function(){
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 360);

    let payload = {
        id: this._id,
        type: 'user'
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    });
};


userSchema.methods.comparePassword = function (password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('user', userSchema);