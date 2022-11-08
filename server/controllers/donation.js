const Fridge = require('../models/publicFridges');
const Donation = require('../models/donations');
const Ngo = require('../models/ngo');
const User = require('../models/user');
const Block = require('../blockchain/bundle');

exports.addDonation = async(req, res) => {
    try {
        const user = req.user;
        
        if(!user)
            return res.status(200).json({success: false, message: 'unauthorized access'});

        const {publicFridgesID, slotNumber} = req.body;

        const publicFridges = await Fridge.findById(publicFridgesID).populate('ngoID').exec();
        
        if(publicFridges.fridgeSlotStatus.length == publicFridges.totalSlots)
            return res.status(200).json({success: false, message: 'Fridge is Full'});

        const checkSlot =  await Fridge.findOne({_id:publicFridges.id, fridgeSlotStatus : { $elemMatch : {slotnumber: slotNumber}}});

        if(checkSlot)
            return res.status(200).json({success: false, message: 'Slot is booked'});

        const ngo = publicFridges.ngoID;
        const newdonation = new Donation({ngoID: ngo, publicFridgesID:publicFridges , userID : user, slotNumber});
        const donation = await newdonation.save();

        publicFridges.totalDonations = publicFridges.totalDonations+1;
        publicFridges.fridgeSlotStatus.push({slotnumber : slotNumber, donationID: donation.id});

        await publicFridges.save();

        // //Todo: from here the donation will bee addded to blockchain
        const donationId = donation.id;
        const ngoId = publicFridges.ngoID.id;
        const userId = user.id;
        const donationType = 'publicFridge';

        // const BlockChain = await Block();
        // const contract = BlockChain.Block;
        // const BlockAddress = BlockChain.address;
        // await contract.methods.addDonation(donationId, ngoId, userId, publicFridgesID, donationType).send({from: BlockAddress[0], gas: '1000000'});

        

        // console.log(result);
        user.donatation.push(donation.id);
        await user.save();

        ngo.donation.push(donation.id);
        await ngo.save();

        return res.status(200).json({success: true, donation});

    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', error: error.message})
    }
}

exports.actionDonation = async(req, res) => {
    try {
        const ngo = req.ngo;

        // if(!ngo)
        //     return res.status(200).json({success: false, message: 'unauthorized access'});

        const {donationID, status} = req.body;

        const donation = await Donation.findById(donationID);
        const publicFridges  = await Fridge.findById(donation.publicFridgesID)

        
        if(donation.status == 'done'){
            return res.status(200).json({success: false, message: 'Already donated'});
        }

        donation.status = status;

        const slotnumber = donation.slotNumber;

        console.log(slotnumber);

        if(status == 'done'){
            console.log(publicFridges);

            for(let i=0;i<publicFridges.fridgeSlotStatus.length;i++){
                if(publicFridges.fridgeSlotStatus[i].slotnumber = slotnumber){
                    await publicFridges.fridgeSlotStatus.id(publicFridges.fridgeSlotStatus[i]._id).remove();
                }
            }
        }

       await publicFridges.save();
       await donation.save();

        return res.status(200).json({success: true, donation});

    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', error: error.message})
    }
}

exports.getUserDonation = async(req, res) => {
    try {
        const user = req.user;

        if(!user)
            return res.status(200).json({success: false, message: 'unauthorized access'});

        const userId = user.id;
        const donation = await Donation.find({userId});

        donation.reverse();
        // const BlockChain = await Block();
        // const contract = BlockChain.Block;
        // const userId = user.id;
        // const result = await contract.methods.getUserDonations(userId).call();

        return res.status(200).json({success: true, donation});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}

exports.getNgoDonation = async(req, res) => {
    try {
        const ngo = req.ngo;

        if(!ngo)
            return res.status(200).json({success: false, message: 'unauthorized access'});

        const ngoId = ngo.id;
        const donation = await Donation.find({ngoId});
        donation.reverse();
       
        // const BlockChain = await Block();
        // const contract = BlockChain.Block;
        // const ngoId = ngo.id;
        // const result = await contract.methods.getUserDonations(ngoId).call();

        return res.status(200).json({success: true, donation});

    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}

exports.getSpecificDonation = async(req, res) => {
    try {
        const {id} = req.params;

        const donation = await Donation.findById(id);

        return res.status(200).json({success: true, donation});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}

exports.getDriveDonation = async(req, res) =>{
    try {
        const {id} = req.params;

        const donation = await Donation.find({driveId:id});

        return res.status(200).json({success: true, donation});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}


exports.getallDonations = async(req, res) => {
    try {
        const donation = await Donation.find({});
        return res.status(200).json({success: true, donation});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}
