const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const Ngo = require('../models/ngo');
const Block = require('../blockchain/bundle');

exports.register = async(req, res) => {
    try {
        let {name, email, password} = req.body;

        const ifUser = await Admin.findOne({email});

        if(ifUser)
            return res.status(200).json({success: false, message: 'user already registered'});

        password = await bcrypt.hashSync(password , 10);

        const newUser = new Admin({name, email, password});
        const user = await newUser.save();

        return res.status(200).json({success: true, user, jwt: user.generateJWT()});

    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', error: error.message})
    }
}

exports.login = async(req, res) => {
    try {
        const {email, password} = req.body;
        
        const user = await Admin.findOne({email});

        if(!user)
            return res.status(200).json({success: false, message: 'UnAuthorized Access'});

        if (!user.comparePassword(password))
            return res.status(200).send({ success: false, message: 'Invalid Password' });

        return res.status(200).json({success:true, user, jwt: user.generateJWT()});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}

exports.verifyNgo = async(req, res) => {
    try {
       const admin = req.admin;

       if(!admin)
            return res.status(200).json({success:false, message: 'Unauthorized Access'});
        
        const {id} = req.body;

        console.log(id);

        const ngo = await Ngo.findById(id);

        if(!ngo)
            return res.status(200).json({success:false, message: 'Cannot Find Ngo'});

        ngo.isVerified = true;
        await ngo.save();

        //Todo: From here the Ngo is added to blockchain
        const BlockChain = await Block();
        const contract = BlockChain.Block;
        const BlockAddress = BlockChain.address;
        await contract.methods.addNgo(ngo.id, ngo.name, ngo.email, ngo.phoneno, ngo.address).send({from: BlockAddress[0], gas: '1000000'});


        return res.status(200).json({success:true, ngo});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', error: error.message})
    }
}



exports.getallNgo = async(req, res) => {
    try {
        const admin = req.admin;
       
       console.log(admin);

       if(!admin)
            return res.status(200).json({success:false, message: 'Unauthorized Access'});
        
        const ngo = await Ngo.find({});

        return res.status(200).json({success:true, ngo});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}



exports.specificNgo = async(req, res) => {
    try {

        const admin = req.admin;
       
        console.log(admin);
 
        if(!admin)
             return res.status(200).json({success:false, message: 'Unauthorized Access'});
         
         const {id} = req.params;
 
         const ngo = await Ngo.findById(id);

         //Todo:when the blockchain is implemented ngos data will be reterived by blockchain
        const BlockChain = await Block();
        const contract = BlockChain.Block;
        const result = await contract.methods.getNgo(id).call();
 
         return res.status(200).json({success:true, ngo, blockNgo: result});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}