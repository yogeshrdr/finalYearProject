const Ngo  = require('../models/ngo');
const bcrypt = require('bcrypt');

exports.login = async(req, res) => {
    try {
        const {email, password} = req.body;
        
        const user = await Ngo.findOne({email});

        if(!user)
            return res.status(200).json({success: false, message: 'Ngo not registered'});

        if (!user.comparePassword(password))
            return res.status(200).send({ success: false, message: 'Invalid Password' });

        return res.status(200).json({success:true, user, jwt: user.generateJWT()});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}


exports.register = async(req, res) => {
    try {
        let {name, email, password, phoneno, address} = req.body;

        const ifUser = await Ngo.findOne({email});

        if(ifUser)
            return res.status(200).json({success: false, message: 'Ngo already registered'});

        password = await bcrypt.hashSync(password , 10);

        const newUser = new Ngo({name, email, password, phoneno, address});
        const user = await newUser.save();

        return res.status(200).json({success: true, user, jwt: user.generateJWT()});

    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}


exports.addDocument = async(req, res) => {
    try {
        const {documents} = req.body;
        const ngo = req.ngo;

        ngo.documents = documents;
        const user = await ngo.save();

        //Todo:send message to admin to verify then ngo will be added to blockchain;

        return res.status(200).json({success: true, user});

    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}
