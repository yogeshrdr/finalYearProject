const ngoDrives = require('../models/ngoDrives');
const Drive = require('../models/ngoDrives');
const Donation = require('../models/donations');
const Block = require('../blockchain/bundle');

exports.addDrive = async(req, res) => {
    try {
        const ngo = req.ngo;
        console.log(ngo);
        if(!ngo)
            return res.status(200).json({success: false, message: 'unauthorized access'});

        let {driveName, description , startDate, endDate,  coord, address, estimatedDonation} = req.body;

        let coordinates = coord;
        let location = { type : "Point", coordinates };

        const newDrive = new Drive({driveName, ngoId:ngo.id, description, startDate, endDate, location, address, estimatedDonation});
        const drive = await newDrive.save();

        ngo.ngoDrives.push(drive);
        await ngo.save();

        
        // const BlockChain = await Block();
        // const contract = BlockChain.Block;
        // const BlockAddress = BlockChain.address;
        // await contract.methods.addNgoDrives(driveName, ngo.id.toString(), estimatedDonation.toString(), address).send({from: BlockAddress[0], gas: '1000000'});

        return res.status(200).json({success: true, drive});
        
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', error: error.message})
    }
}

exports.addDonation = async(req, res) => {
    try {
        const user = req.user;

        if(!user)
            return res.status(200).json({success: true, message: 'unauthorized access'});

        const {driveId} = req.body;

        const drive = await Drive.findById(driveId);

        drive.progess = drive.progess + 1;

        //ramaning to donate function 

        await drive.save();
        return res.status(200).json({success: true, drive});

    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}

exports.ngoDrive = async(req, res) => {
    try {
        const ngo = req.ngo;
       
        if(!ngo)
            return res.status(200).json({success: false, message: 'unauthorized access'});
        
       
        const drive = await Drive.find({ngoId: ngo.id});
        drive.reverse();
        return res.status(200).json({success: true, drive});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}


exports.getallDrive = async(req, res) => {
    const drive = await Drive.find({});
    drive.reverse();
    return res.status(200).json({success: true, drive});
}

exports.specificngoDrive = async(req, res) => {
    try {
        const {id} = req.params;

        const drive = await Drive.findById(id).populate('ngoId').exec();

        return res.status(200).json({success: true, drive});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', error: error.message})
    }
}

exports.addDriveDonation = async(req, res) => {
    try {
        const user = req.user;

        if(!user)
            return res.status(200).json({success: false, message: 'unauthorized access'});

        const userId = user.id
        const {ngoId, driveId, amount} = req.body;
        const donationType = 'drive';
        const temp = new Donation({ngoId, userId, driveId, donationType, amount});

        const drive = await Drive.findById(driveId);
        drive.totalDonation = drive.totalDonation+1;
        await drive.save();

        await temp.save();
        res.status(200).json({success: true});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}