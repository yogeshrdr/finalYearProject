const Ngo  = require('../models/ngo');
const bcrypt = require('bcrypt');
const Fridge = require('../models/publicFridges');
const Slots = require('../models/slot');
const Donation = require('../models/donations');
const Block = require('../blockchain/bundle');

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
        let {name, email, password} = req.body;

        const ifUser = await Ngo.findOne({email});

        if(ifUser)
            return res.status(200).json({success: false, message: 'Ngo already registered'});

        password = await bcrypt.hashSync(password , 10);

        const newUser = new Ngo({name, email, password});
        const user = await newUser.save();

        return res.status(200).json({success: true, user, jwt: user.generateJWT()});

    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}


exports.addDocument = async(req, res) => {
    try {
       
        const ngo = req.ngo;

        const {uniqueId, address, phoneno, fssai, registrationCertificate, adharCard} = req.body;

        ngo.uniqueId = uniqueId;
        ngo.address = address;
        ngo.phoneno = phoneno;
        ngo.fssai = fssai;
        ngo.registrationCertificate = registrationCertificate;
        ngo.adharCard = adharCard;
        ngo.isDocumnetUploaded = true

        const user = await ngo.save();

        //Todo:send message to admin to verify then ngo will be added to blockchain;

        return res.status(200).json({success: true, user});

    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', error: error.message})
    }
}



exports.addPublicFridge = async(req, res) =>{
    try {
        const ngo = req.ngo;

        if(!ngo)
            res.status(200).json({success: false, message:'unauth access'});

            
        const ngoID = ngo.id;

        const {totalslots, fridgeType, address, coord} = req.body;
        let coordinates = coord;
        let location = { type : "Point", coordinates };

        const newpublicFridge = new Fridge({ngoID, totalSlots: totalslots, fridgeType, address, location});
        const publicFridge = await newpublicFridge.save();

        
        // const BlockChain = await Block();
        // const contract = BlockChain.Block;
        // const BlockAddress = BlockChain.address;
        // await contract.methods.addPublicFridges(publicFridge.ngoID.toString(), publicFridge.totalSlots.toString(), publicFridge.fridgeType, publicFridge.address).send({from: BlockAddress[0], gas: '1000000'});

        const FridgesID = publicFridge.id;

        for(let i=0;i<totalslots;i++){
            const slotNumber = i+1;

            const newSlot = new Slots({FridgesID, slotNumber});
            await newSlot.save();
        }

        return res.status(200).json({success: true});

    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', error: error.message});
    }
}


exports.getNgoPublicFridge = async(req, res) =>{
    try {
        const ngo = req.ngo;
        if(!ngo)
            res.status(200).json({success: false, message:'unauth access'});

        const ngoId = ngo.id;

        const publicFridge = await Fridge.find({ngoID: ngoId});
        publicFridge.reverse();

        return res.status(200).json({success: true, publicFridge});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', error: error.message});
    }
}


exports.getAllFridge = async(req, res) => {
    try {
        const publicFridge = await Fridge.find({isFull: false});
        publicFridge.reverse();
        return res.status(200).json({success: true, publicFridge});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', error: error.message});
    }
}


exports.getFrigeNearLocation = async(req, res) => {
    try {
        const {coord} = req.body;

        let coordinates = coord;

        
        const publicFridge = await Fridge.find({
                location:{ $near :
                   {
                     $geometry: { type: "Point",  coordinates },
                     $maxDistance: 5000000
                   }
        }});
        publicFridge.reverse();

        return res.status(200).json({success: true, publicFridge});
            
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', error: error.message});
    }
}


exports.specificFridge = async(req, res) => {
    try {
        const {id} = req.params;

        const publicFridge =  await Fridge.findById(id);
        const slots = await Slots.find({FridgesID: id});
        const ngoId = publicFridge.ngoID;
        const ngo = await Ngo.findById(ngoId);

        return res.status(200).json({success: true, publicFridge, slots, ngo});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', error: error.message});
    }
}


exports.donateFridge = async(req, res) => {
    try{

        const user = req.user;

        if(!user)
            return res.status(200).json({success: true, message: 'unAuth access'});

        const userID = user.id;

        const {ngoID, publicFridgesID} = req.body;

        console.log("sssss", publicFridgesID);

        const slot = await Slots.findOne({FridgesID: publicFridgesID, isFree: true});

        if(!slot){
            return res.status(200).json({success: true, message: 'no slots are free'});
        }
        const newDonation = new Donation({ngoID, userID, publicFridgesID});
        
        const donation = await newDonation.save();
        const donationID = donation.id;
        slot.DonationID = donationID;
        slot.isFree = false;

        await slot.save();

        // const BlockChain = await Block();
        // const contract = BlockChain.Block;
        // const BlockAddress = BlockChain.address;
        // await contract.methods.addPublicFridgeDonations(userID.toString(), ngoID.toString(), publicFridgesID.toString(), 'pending').send({from: BlockAddress[0], gas: '1000000'});

        return res.status(200).json({success: true});
        

    }catch(error){
        res.status(500).json({success: false, message: 'Server Error', error: error.message});
    }
}


exports.actionFridge = async(req, res) => {
    try {
        const {slotId} = req.body;

        const slot = await Slots.findById(slotId);

        slot.isFree = true;
        await slot.save();

        const donationId = slot.DonationID;
        const donation = await Donation.findById(donationId);
        donation.status = "done";
        await donation.save();

        const id = slot.FridgesID;
        const publicFridge =  await Fridge.findById(id);
        const slots = await Slots.find({FridgesID: id});
        const ngoId = publicFridge.ngoID;
        const ngo = await Ngo.findById(ngoId);

        return res.status(200).json({success: true, publicFridge, slots, ngo});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', error: error.message});
    }
}