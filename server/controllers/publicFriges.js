const Fridge = require('../models/publicFridges');
const Ngo = require('../models/ngo');

exports.addFridges = async(req, res) => {
    try {
        const ngo = req.ngo;

        if(!ngo)
            return res.status(200).json({success: false, message: 'unauthorized access'});

        let {totalSlots, fridgeType, coord, address } = req.body;

        let coordinates = [coord[1], coord[0]];
        let location = { type : "Point", coordinates };

        const newFridge = new Fridge({ngoID:ngo, totalSlots, fridgeType, location, address });
        const PublicFridge = await newFridge.save();

        //Todo: here PublicFrige is Added to blockchain

        await ngo.publicFridges.push(PublicFridge);
        await ngo.save();

        return res.status(200).json({success: true, PublicFridge, ngo});

    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', error: error.message})
    }
}

exports.userFridge = async(req, res) => {
    try {
        const user = req.user;

        if(!user)
            return res.status(200).json({success: false, message: 'unauthorized access'});

        const {coord} = req.body;

        let coordinates = [coord[1], coord[0]];

        
        const fridges = await Fridge.find({
                location:{ $near :
                   {
                     $geometry: { type: "Point",  coordinates },
                     $maxDistance: 5000000
                   }
                }
        });

        return res.status(200).json({success: true, fridges, user});

    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', error: error.message})
    }
}


exports.ngoFridge = async(req, res) => {
    try {
        const checkngo = req.ngo;

        if(!checkngo)
            return res.status(200).json({success: false, message: 'unauthorized access'});

        //Todo: This fucntion will be changed when blockchain is implemented

        const ngo = await Ngo.findById(checkngo.id).populate('publicFridges').exec();

        const publicFridges = await ngo.publicFridges;

        return res.status(200).json({success: true, publicFridges});
        
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}

