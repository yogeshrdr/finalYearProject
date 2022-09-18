const ngoDrives = require('../models/ngoDrives');
const Drive = require('../models/ngoDrives');

exports.addDrive = async(req, res) => {
    try {
        const ngo = req.ngo;

        if(!ngo)
            return res.status(200).json({success: true, message: 'unauthorized access'});

        const{driveDescription, startDate, endDate, typeRequired, coord, address} = req.body;

        let coordinates = [coord[1], coord[0]];
        let location = { type : "Point", coordinates };

        const newDrive = new Drive({ngoId:ngo.id, driveDescription, startDate, endDate, typeRequired, location, address});
        const drive = await newDrive.save();

        ngo.ngoDrives.push(drive);
        await ngo.save();

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
        const drive = await Drive.find({});
        return res.status(200).json({success: true, drive});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}

exports.specificngoDrive = async(req, res) => {
    try {
        const {id} = req.params;

        const drive = await Drive.findById(id);

        return res.status(200).json({success: true, drive});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}
