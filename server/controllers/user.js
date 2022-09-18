const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.register = async(req, res) => {
    try {
        let {name, email, password, phoneno} = req.body;

        const ifUser = await User.findOne({email});

        if(ifUser)
            return res.status(200).json({success: false, message: 'user already registered'});

        password = await bcrypt.hashSync(password , 10);

        const newUser = new User({name, email, password, phoneno});
        const user = await newUser.save();

        return res.status(200).json({success: true, user, jwt: user.generateJWT()});

    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', error: error.message})
    }
}

exports.login = async(req, res) => {
    try {
        const {email, password} = req.body;
        
        const user = await User.findOne({email});

        if(!user)
            return res.status(200).json({success: false, message: 'user not registered'});

        if (!user.comparePassword(password))
            return res.status(200).send({ success: false, message: 'Invalid Password' });

        return res.status(200).json({success:true, user, jwt: user.generateJWT()});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}
